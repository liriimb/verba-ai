import { apiClient } from './client';
import type { ChatResponse } from '../types/chat';

export async function sendChatMessage(input: {
  message: string;
  conversationId?: string;
}): Promise<ChatResponse> {
  const res = await apiClient.post<ChatResponse>('/api/chat', input);
  return res.data;
}
