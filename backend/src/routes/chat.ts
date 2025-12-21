import type { FastifyInstance } from 'fastify';
import { nanoid } from 'nanoid';
import { getMockReply, type ChatMessage } from '../services/mockAi.js';

const MAX_CONVERSATIONS = 20; 
const MAX_MESSAGES_PER_CONVO = 80;

const conversations = new Map<string, ChatMessage[]>();
const conversationOrder: string[] = [];

function touchConversation(id: string) {
  const idx = conversationOrder.indexOf(id);
  if (idx !== -1) conversationOrder.splice(idx, 1);
  conversationOrder.push(id);

  while (conversationOrder.length > MAX_CONVERSATIONS) {
    const oldest = conversationOrder.shift();
    if (oldest) {
      conversations.delete(oldest);
    }
  }
}

function trimHistory(history: ChatMessage[]) {
  if (history.length > MAX_MESSAGES_PER_CONVO) {
    history.splice(0, history.length - MAX_MESSAGES_PER_CONVO);
  }
}

export async function registerChatRoutes(app: FastifyInstance) {
  app.post<{ Body: { message: string; conversationId?: string } }>('/chat', async (req, reply) => {
    const message = (req.body?.message ?? '').trim();
    if (!message) {
      return reply.status(400).send({ error: 'Message is required.' });
    }

    const conversationId = req.body.conversationId ?? nanoid();

    const history = conversations.get(conversationId) ?? [];
    touchConversation(conversationId);

    const userTime = new Date().toISOString();

    history.push({ role: 'user', text: message, timestamp: userTime });

    const aiText = getMockReply(message, history);
    const aiTime = new Date().toISOString();

    history.push({ role: 'assistant', text: aiText, timestamp: aiTime });

    trimHistory(history);

    conversations.set(conversationId, history);

    return {
      conversationId,
      reply: aiText,
      timestamp: aiTime,
    };
  });
}
