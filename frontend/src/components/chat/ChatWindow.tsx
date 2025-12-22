import { Container, Paper } from '@mui/material';
import { Composer } from './Composer';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ErrorBanner } from './ErrorBanner';
import { useChatStorage } from '../../hooks/useChatStorage';
import { useChatController } from '../../hooks/useChatController';
import { useAutoScroll } from '../../hooks/useAutoScroll';
import { MIN_TYPING_MS } from '../../config/chatUi';
import { chatStyles } from '../../utils/chatStyles';

export function ChatWindow() {
  const { conversationId, setConversationId, messages, setMessages, reset } = useChatStorage();
  const { isSending, error, setError, send, cancelInFlight } = useChatController({
    conversationId,
    setConversationId,
    setMessages,
    minTypingMs: MIN_TYPING_MS,
  });

  const bottomRef = useAutoScroll([messages.length, isSending]);

  function newChat() {
    cancelInFlight();
    reset();
    setError(null);
  }

  return (
    <Container maxWidth="sm" sx={chatStyles.page}>
      <Paper elevation={2} sx={chatStyles.card}>
        <ChatHeader onNewChat={newChat} />

        <ChatMessages messages={messages} isSending={isSending} bottomRef={bottomRef} />

        {error && <ErrorBanner message={error} />}

        <Composer disabled={isSending} onSend={send} />
      </Paper>
    </Container>
  );
}
