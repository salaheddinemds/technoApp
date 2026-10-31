import assert from 'node:assert/strict';
import test from 'node:test';
import {
  MAX_IMAGE_SIZE_BYTES,
  MAX_PRODUCT_IMAGES,
  validateImageBuffer
} from './image-validation.js';

test('defines the image upload limits from the API contract', () => {
  assert.equal(MAX_IMAGE_SIZE_BYTES, 5 * 1024 * 1024);
  assert.equal(MAX_PRODUCT_IMAGES, 8);
});

test('accepts JPEG, PNG, and WebP signatures', async () => {
  const samples = [
    Buffer.from([0xff, 0xd8, 0xff, 0xdb, 0x00, 0x43]),
    Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lqoAAAAASUVORK5CYII=',
      'base64'
    ),
    Buffer.from('RIFF0000WEBPVP8 ')
  ];

  for (const sample of samples) {
    await assert.doesNotReject(validateImageBuffer(sample));
  }
});

test('rejects unknown and non-image file signatures', async () => {
  await assert.rejects(validateImageBuffer(Buffer.from('not an image')), {
    statusCode: 415,
    code: 'FILE_TYPE_NOT_ALLOWED'
  });
});
