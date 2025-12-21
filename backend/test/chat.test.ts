import { describe, expect, it } from 'vitest';
import { buildApp } from '../src/app.js';

describe('POST /api/chat', () => {
  it('returns reply + conversationId', async () => {
    const app = buildApp();

    const res = await app.inject({
      method: 'POST',
      url: '/api/chat',
      payload: { message: 'hello' }
    });

    expect(res.statusCode).toBe(200);

    const body = res.json();
    expect(body.conversationId).toBeTruthy();
    expect(body.reply).toBeTruthy();
    expect(body.timestamp).toBeTruthy();
  });

  it('rejects empty message', async () => {
    const app = buildApp();

    const res = await app.inject({
      method: 'POST',
      url: '/api/chat',
      payload: { message: '   ' }
    });

    expect(res.statusCode).toBe(400);
  });
});
