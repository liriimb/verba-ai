import { Box, CircularProgress, Typography } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';

export function SplashScreen({ leaving = false }: { leaving?: boolean }) {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        zIndex: 2000,
        animation: leaving ? 'splashOut 300ms ease-in both' : undefined,
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          animation: 'splashIn 650ms ease-out both',
        }}
      >
        <SmartToyIcon sx={{ fontSize: 56, mb: 1 }} />
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
          Verba AI
        </Typography>
        <Typography sx={{ opacity: 0.75, mb: 2 }}>Welcome dear user! - preparing your chat…</Typography>
        <CircularProgress size={22} />
      </Box>

      <style>
        {`
          @keyframes splashIn {
            from { opacity: 0; transform: translateY(10px) scale(0.98); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}
      </style>
    </Box>
  );
}
