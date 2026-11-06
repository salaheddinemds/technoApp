import assert from 'node:assert/strict';
import { once } from 'node:events';
import express from 'express';
import test from 'node:test';
import { loginRateLimiter } from './login-rate-limit.middleware.js';

test('returns the API error shape when the login limit is reached', async () => {
  const app = express();
  app.set('trust proxy', false);
  app.post('/login', loginRateLimiter, (_request, response) => {
    response.json({ data: { accepted: true } });
  });

  const server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const { port } = server.address();

  try {
    for (let attempt = 0; attempt < 100; attempt += 1) {
      const response = await fetch(`http://127.0.0.1:${port}/login`, { method: 'POST' });
      assert.equal(response.status, 200);
    }

    const response = await fetch(`http://127.0.0.1:${port}/login`, { method: 'POST' });
    assert.equal(response.status, 429);
    assert.equal((await response.json()).error.code, 'TOO_MANY_REQUESTS');
    assert.match(response.headers.get('ratelimit-policy'), /q=100; w=900/);
  } finally {
    server.close();
    await once(server, 'close');
  }
});
