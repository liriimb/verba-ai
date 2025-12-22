import { Box, Button, CircularProgress, Container, Paper, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { sendChatMessage } from '../api/chatApi';
import type { ChatMessage } from '../types/chat';
import { MessageBubble } from './MessageBubble';
import { Composer } from './Composer';
import axios from 'axios';
import { useChatStorage } from '../hooks/useChatStorage';

const STORAGE_MESSAGES_KEY = 'verba_ai_messages';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const apiMsg = (err.response?.data as { error?: string } | undefined)?.error ?? err.message;
    return apiMsg || 'Request failed.';
  }

  if (err instanceof Error) {
    return err.message;
  }

  return 'Something went wrong while sending the message.';
}

export function ChatWindow() {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { conversationId, setConversationId, messages, setMessages, reset } = useChatStorage();

  const abortRef = useRef<AbortController | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  function cancelInFlight() {
  abortRef.current?.abort();
  abortRef.current = null;
  }

  useEffect(() => {
    return () => cancelInFlight();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isSending]);

  useEffect(() => {
    localStorage.setItem(STORAGE_MESSAGES_KEY, JSON.stringify(messages));
  }, [messages]);

  function newChat() {
    cancelInFlight();
    reset();
    setError(null);
  }

  async function handleSend(text: string) {
    setError(null);

    const userMsg: ChatMessage = {
      id: nanoid(),
      role: 'user',
      text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);;

    cancelInFlight();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsSending(true);

    const start = Date.now();
    const MIN_TYPING_MS = 800;

    try {
      const data = await sendChatMessage(
        { message: text, conversationId },
        controller.signal,
      );

      const elapsed = Date.now() - start;
      if (elapsed < MIN_TYPING_MS) {
        await sleep(MIN_TYPING_MS - elapsed);
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
      if (axios.isAxiosError(err) && err.code === 'ERR_CANCELED') {
        return
      }
      setError(getErrorMessage(err));
    } finally {
      abortRef.current = null;
      setIsSending(false);
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Paper elevation={2} sx={{ p: 2, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, overflowX: 'hidden' }}>
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
            mb: 2,
          }}
        >
          {messages.length === 0 && (
            <Typography sx={{ opacity: 0.7 }}>Ask a question to start the conversation.</Typography>
          )}

          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}

          {isSending && (
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
