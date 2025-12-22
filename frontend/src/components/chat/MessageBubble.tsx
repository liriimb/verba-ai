import { Avatar, Box, Paper, Typography } from '@mui/material';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import type { ChatMessage } from '../../types/chat';
import { formatTime } from '../../utils/time';
import { chatStyles as styles } from '../../utils/chatStyles';

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';

  return (
    <Box sx={isUser ? styles.rowUser : styles.rowAssistant}>
      {!isUser && (
        <Avatar sx={styles.assistantAvatar}>
          <SupportAgentOutlinedIcon fontSize="small" />
        </Avatar>
      )}

      <Paper
        elevation={1}
        sx={isUser ? styles.userBubble : styles.assistantBubble}
      >
        <Typography variant="body1" sx={styles.messageText}>
          {message.text}
        </Typography>

        <Typography variant="caption" sx={styles.timestamp}>
          {formatTime(message.timestamp)}
        </Typography>
      </Paper>
    </Box>
  );
}
