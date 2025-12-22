import { Box, CircularProgress, Typography } from '@mui/material';
import type { RefObject } from 'react';
import type { ChatMessage } from '../../types/chat';
import { chatStyles } from '../../utils/chatStyles';
import { CHAT_HEIGHT } from '../../config/chatUi';
import { MessageBubble } from './MessageBubble';

export function ChatMessages({
  messages,
  isSending,
  bottomRef,
}: {
  messages: ChatMessage[];
  isSending: boolean;
  bottomRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <Box sx={{ ...chatStyles.messagesPanel, height: CHAT_HEIGHT }}>
      {messages.length === 0 && (
        <Typography sx={chatStyles.emptyHint}>Ask a question to start the conversation.</Typography>
      )}

      {messages.map((m) => (
        <MessageBubble key={m.id} message={m} />
      ))}

      {isSending && (
        <Box sx={chatStyles.typingRow}>
          <CircularProgress size={16} />
          <Typography variant="body2" sx={chatStyles.typingText}>
            Typing…
          </Typography>
        </Box>
      )}

      <div ref={bottomRef} />
    </Box>
  );
}
