export type Role = 'user' | 'assistant';

export type ChatMessage = {
  id: string;
  role: Role;
  text: string;
  timestamp: string;
};

export type ChatResponse = {
  conversationId: string;
  reply: string;
  timestamp: string;
};
