import Fastify from 'fastify';
import cors from '@fastify/cors';
import { registerChatRoutes } from './routes/chat.js';

export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(cors, { origin: true });

  app.get('/health', async () => ({ ok: true }));

  app.register(registerChatRoutes, { prefix: '/api' });

  return app;
}
