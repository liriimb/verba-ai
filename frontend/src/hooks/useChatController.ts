import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { sendChatMessage } from '../api/chatApi';
import type { ChatMessage } from '../types/chat';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const apiMsg = (err.response?.data as { error?: string } | undefined)?.error ?? err.message;
    return apiMsg || 'Request failed.';
  }

  if (err instanceof Error) return err.message;

  return 'Something went wrong while sending the message.';
}

export function useChatController(params: {
  conversationId?: string;
  setConversationId: (id: string | undefined) => void;
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  minTypingMs?: number;
}) {
  const { conversationId, setConversationId, setMessages, minTypingMs = 750 } = params;

  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  function cancelInFlight() {
    abortRef.current?.abort();
    abortRef.current = null;
  }

  useEffect(() => {
    return () => cancelInFlight();
  }, []);

  async function send(text: string) {
    setError(null);

    const userMsg: ChatMessage = {
      id: nanoid(),
      role: 'user',
      text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);

    cancelInFlight();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsSending(true);

    const start = Date.now();

    try {
      const data = await sendChatMessage({ message: text, conversationId }, controller.signal);

      const elapsed = Date.now() - start;
      if (elapsed < minTypingMs) {
        await sleep(minTypingMs - elapsed);
      }

      setConversationId(data.conversationId);

      const assistantMsg: ChatMessage = {
        id: nanoid(),
        role: 'assistant',
        text: data.reply,
        timestamp: data.timestamp,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      const elapsed = Date.now() - start;
      if (elapsed < minTypingMs) {
        await sleep(minTypingMs - elapsed);
      }

      if (axios.isAxiosError(err) && err.code === 'ERR_CANCELED') {
        return;
      }

      setError(getErrorMessage(err));
    } finally {
      abortRef.current = null;
      setIsSending(false);
    }
  }

  return {
    isSending,
    error,
    setError,
    send,
    cancelInFlight,
  };
}
