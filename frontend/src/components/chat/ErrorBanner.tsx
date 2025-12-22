import { Typography } from '@mui/material';
import { chatStyles } from '../../utils/chatStyles';

export function ErrorBanner({ message }: { message: string }) {
  return (
    <Typography color="error" sx={chatStyles.errorText}>
      {message}
    </Typography>
  );
}
