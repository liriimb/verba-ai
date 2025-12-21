import { IconButton, TextField, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';

export function Composer({
  disabled,
  onSend
}: {
  disabled: boolean;
  onSend: (text: string) => void;
}) {
  const [text, setText] = useState('');

  function submit() {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText('');
  }

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <TextField
        fullWidth
        placeholder="Type your message..."
        helperText="Enter to send • Shift+Enter for new line"
        value={text}
        minRows={1}
        maxRows={6}
        multiline
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        disabled={disabled}
      />
      <IconButton onClick={submit} disabled={disabled || !text.trim()} aria-label="Send">
        <SendIcon />
      </IconButton>
    </Box>
  );
}
