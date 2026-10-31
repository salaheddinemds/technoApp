import assert from 'node:assert/strict';
import { once } from 'node:events';
import express from 'express';
import test from 'node:test';
import { errorHandler } from './error.middleware.js';
import { receiveProductImages } from './upload-images.middleware.js';
import { MAX_IMAGE_SIZE_BYTES } from '../lib/image-validation.js';

async function withUploadServer(run) {
  const app = express();
  app.post('/upload', receiveProductImages, (_request, response) => {
    response.status(204).end();
  });
  app.use(errorHandler);

  const server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const { port } = server.address();

  try {
    await run(`http://127.0.0.1:${port}/upload`);
  } finally {
    server.close();
    await once(server, 'close');
  }
}

test('accepts a photo at the 5 MiB size limit', async () => {
  await withUploadServer(async (url) => {
    const form = new FormData();
    form.append('images', new Blob([Buffer.alloc(MAX_IMAGE_SIZE_BYTES)]), 'photo.jpg');

    const response = await fetch(url, { method: 'POST', body: form });
    assert.equal(response.status, 204);
  });
});

test('rejects a photo larger than 5 MiB', async () => {
  await withUploadServer(async (url) => {
    const form = new FormData();
    form.append('images', new Blob([Buffer.alloc(MAX_IMAGE_SIZE_BYTES + 1)]), 'photo.jpg');

    const response = await fetch(url, { method: 'POST', body: form });
    assert.equal(response.status, 413);
    assert.equal((await response.json()).error.code, 'FILE_TOO_LARGE');
  });
});

test('rejects more than 8 photos in one request', async () => {
  await withUploadServer(async (url) => {
    const form = new FormData();
    for (let index = 0; index < 9; index += 1) {
      form.append('images', new Blob(['x']), `photo-${index}.jpg`);
    }

    const response = await fetch(url, { method: 'POST', body: form });
    assert.equal(response.status, 400);
    assert.equal((await response.json()).error.code, 'VALIDATION_ERROR');
  });
});
