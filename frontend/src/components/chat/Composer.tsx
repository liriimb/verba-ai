import { Box, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { INPUT_MAX_ROWS, INPUT_MIN_ROWS } from '../../config/chatUi';

export function Composer({
  disabled,
  onSend,
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
        value={text}
        onChange={(e) => setText(e.target.value)}
        multiline
        minRows={INPUT_MIN_ROWS}
        maxRows={INPUT_MAX_ROWS}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        disabled={disabled}
        helperText="Enter to send • Shift+Enter for new line"
      />

      <IconButton onClick={submit} disabled={disabled || !text.trim()} aria-label="Send">
        <SendIcon />
      </IconButton>
    </Box>
  );
}
