import { Box, Button, Typography } from '@mui/material';
import { chatStyles } from '../../utils/chatStyles';

export function ChatHeader({ onNewChat }: { onNewChat: () => void }) {
  return (
    <Box sx={chatStyles.headerRow}>
      <Typography variant="h6">Verba AI - Support Chat</Typography>
      <Button size="small" onClick={onNewChat}>
        New chat
      </Button>
    </Box>
  );
}
