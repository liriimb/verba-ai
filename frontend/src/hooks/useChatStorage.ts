import { useEffect, useState } from 'react';
import type { ChatMessage } from '../types/chat';

const CONVO_KEY = 'verba_ai_conversation_id';
const MESSAGES_KEY = 'verba_ai_messages';

function safeParseMessages(raw: string | null): ChatMessage[] {
  if (!raw) return [];
  try {
    return JSON.parse(raw) as ChatMessage[];
  } catch {
    return [];
  }
}

export function useChatStorage() {
  const [conversationId, setConversationId] = useState<string | undefined>(() => {
    const saved = localStorage.getItem(CONVO_KEY);
    return saved || undefined;
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return safeParseMessages(localStorage.getItem(MESSAGES_KEY));
  });

  useEffect(() => {
    if (conversationId) localStorage.setItem(CONVO_KEY, conversationId);
    else localStorage.removeItem(CONVO_KEY);
  }, [conversationId]);

  useEffect(() => {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  }, [messages]);

  function reset() {
    localStorage.removeItem(CONVO_KEY);
    localStorage.removeItem(MESSAGES_KEY);
    setConversationId(undefined);
    setMessages([]);
  }

  return { conversationId, setConversationId, messages, setMessages, reset };
}
