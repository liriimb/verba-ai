import { Box, Button, CircularProgress, Container, Paper, Typography } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { sendChatMessage } from '../api/chatApi';
import type { ChatMessage } from '../types/chat';
import { MessageBubble } from './MessageBubble';
import { Composer } from './Composer';
import axios from 'axios';

const STORAGE_KEY = 'verba_ai_conversation_id';
const STORAGE_MESSAGES_KEY = 'verba_ai_messages';


function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const apiMsg =
      (err.response?.data as { error?: string } | undefined)?.error ??
      err.message;
    return apiMsg || 'Request failed.';
  }

  if (err instanceof Error) {
    return err.message;
  }

  return 'Something went wrong while sending the message.';
}

export function ChatWindow() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
  const raw = localStorage.getItem(STORAGE_MESSAGES_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as ChatMessage[];
  } catch {
    return [];
  }
  });

  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | undefined>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved || undefined;
  });

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const typingMessage = useMemo<ChatMessage | null>(() => {
    if (!isSending) return null;
    return {
      id: 'typing',
      role: 'assistant',
      text: 'Typing…',
      timestamp: new Date().toISOString()
    };
  }, [isSending]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isSending]);

  useEffect(() => {
    localStorage.setItem(STORAGE_MESSAGES_KEY, JSON.stringify(messages));
  }, [messages]);

  function newChat() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_MESSAGES_KEY);
    setConversationId(undefined);
    setMessages([]);
    setError(null);
  }

  async function handleSend(text: string) {
    setError(null);

    const userMsg: ChatMessage = {
      id: nanoid(),
      role: 'user',
      text,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsSending(true);

    const start = Date.now();
    const MIN_TYPING_MS = 750;

    try {
      const data = await sendChatMessage({ message: text, conversationId });

      const elapsed = Date.now() - start;
      if (elapsed < MIN_TYPING_MS) {
        await sleep(MIN_TYPING_MS - elapsed);
      }

      setConversationId(data.conversationId);
      localStorage.setItem(STORAGE_KEY, data.conversationId);

      const assistantMsg: ChatMessage = {
        id: nanoid(),
        role: 'assistant',
        text: data.reply,
        timestamp: data.timestamp
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      const elapsed = Date.now() - start;
    if (elapsed < MIN_TYPING_MS) {
      await sleep(MIN_TYPING_MS - elapsed);
    }

    setError(getErrorMessage(err));
    } finally {
      setIsSending(false);
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Paper elevation={2} sx={{ p: 2, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6">Verba AI - Support Chat</Typography>
          <Button size="small" onClick={newChat}>
            New chat
          </Button>
        </Box>

        <Box
          sx={{
            height: '60vh',
            overflowY: 'auto',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            p: 2,
            mb: 2
          }}
        >
          {messages.length === 0 && (
            <Typography sx={{ opacity: 0.7 }}>
              Ask a question to start the conversation.
            </Typography>
          )}

          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}

          {typingMessage && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
              <CircularProgress size={16} />
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Typing…
              </Typography>
            </Box>
          )}

          <div ref={bottomRef} />
        </Box>

        {error && (
          <Typography color="error" sx={{ mb: 1 }}>
            {error}
          </Typography>
        )}

        <Composer disabled={isSending} onSend={handleSend} />
      </Paper>
    </Container>
  );
}
