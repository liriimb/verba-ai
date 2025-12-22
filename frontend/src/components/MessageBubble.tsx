import { Box, Paper, Typography } from '@mui/material';
import type { ChatMessage } from '../types/chat';
import { formatTime } from '../utils/time';

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 1,
        minWidth: 0,
      }}
    >
      <Paper
        elevation={1}
        sx={{
          px: 2,
          py: 1.25,
          maxWidth: '85%',
          borderRadius: 2,
          minWidth: 0,
        }}
      >
        <Typography variant="body1" 
        sx={{ 
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          overflowWrap: 'anywhere',
        }}>
          {message.text}
        </Typography>

        <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mt: 0.5 }}>
          {formatTime(message.timestamp)}
        </Typography>
      </Paper>
    </Box>
  );
}
