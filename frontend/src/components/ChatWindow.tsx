import { Box, Button, CircularProgress, Container, Paper, Typography } from '@mui/material';
import { useEffect, useRef} from 'react';
import { MessageBubble } from './MessageBubble';
import { Composer } from './Composer';
import { useChatStorage } from '../hooks/useChatStorage';
import { useChatController } from '../hooks/useChatController';

const STORAGE_MESSAGES_KEY = 'verba_ai_messages';

export function ChatWindow() {

  const { conversationId, setConversationId, messages, setMessages, reset } = useChatStorage();
  const { isSending, error, setError, send, cancelInFlight } = useChatController({
    conversationId,
    setConversationId,
    setMessages,
    minTypingMs: 750,
  });

  const bottomRef = useRef<HTMLDivElement | null>(null);

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
    await send(text);
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
