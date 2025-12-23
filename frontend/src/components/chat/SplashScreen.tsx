import { Box, CircularProgress, Typography } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { chatStyles as styles } from '../../utils/chatStyles';

export function SplashScreen({ leaving = false }: { leaving?: boolean }) {
  return (
    <Box sx={styles.splashOverlay(leaving)}>
      <Box sx={styles.splashContent}>
        <SmartToyIcon sx={styles.splashIcon} />
        <Typography variant="h4" sx={styles.splashTitle}>
          Verba AI
        </Typography>
        <Typography sx={styles.splashSubtitle}>
          Welcome dear user! - preparing your chat…
        </Typography>
        <CircularProgress size={22} />
      </Box>
    </Box>
  );
}
