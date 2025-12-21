export type Role = 'user' | 'assistant';

export type ChatMessage = {
  role: Role;
  text: string;
  timestamp: string;
};

export function getMockReply(message: string, history: ChatMessage[]): string {
  const m = message.toLowerCase();

  const lastUser = [...history].reverse().find((x) => x.role === 'user')?.text;

  if (m.includes('hello') || m.includes('hi') || m.includes('pershendetje')) {
    return 'Hi! How can I help you today?';
  }

  if (m.includes('refund') || m.includes('return')) {
    return 'Sure — can you share your order number? I can guide you through the return/refund steps.';
  }

  if (m.includes('price') || m.includes('pricing')) {
    return 'Happy to help. Which product/plan are you asking about, and what’s your approximate usage?';
  }

  if (lastUser) {
    return 'Thanks — I understand. Can you add one more detail (account/email/order number) so I can help faster?';
  }

  return 'Thanks! Can you clarify what you need help with?';
}
