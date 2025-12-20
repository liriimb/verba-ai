import type { FastifyInstance } from 'fastify';
import { nanoid } from 'nanoid';
import { getMockReply, type ChatMessage } from '../services/mockAi.js';

const conversations = new Map<string, ChatMessage[]>();

export async function registerChatRoutes(app: FastifyInstance) {
  app.post<{ Body: { message: string; conversationId?: string } }>(
    '/chat',
    async (req, reply) => {
      const message = (req.body?.message ?? '').trim();
      if (!message) {
        return reply.status(400).send({ error: 'Message is required.' });
      }

      const conversationId = req.body.conversationId ?? nanoid();

      const history = conversations.get(conversationId) ?? [];
      const userTime = new Date().toISOString();

      history.push({ role: 'user', text: message, timestamp: userTime });

      const aiText = getMockReply(message, history);
      const aiTime = new Date().toISOString();

      history.push({ role: 'assistant', text: aiText, timestamp: aiTime });

      conversations.set(conversationId, history);

      return {
        conversationId,
        reply: aiText,
        timestamp: aiTime
      };
    }
  );
}
