import { Box, Button, Stack, Typography } from '@mui/material';
import { SUGGESTED_PROMPTS } from '../../config/suggPrompts';
import { chatStyles as styles } from '../../utils/chatStyles';

export function SuggestedPrompts({ onPick }: { onPick: (text: string) => void }) {
  return (
    <Box sx={styles.promptsWrap}>
      <Typography variant="body2" sx={styles.promptsHint}>
        Try one of these:
      </Typography>

      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
        {SUGGESTED_PROMPTS.map((p) => (
          <Button
            key={p.label}
            size="small"
            variant="outlined"
            sx={styles.promptButton}
            onClick={() => onPick(p.text)}
          >
            {p.label}
          </Button>
        ))}
      </Stack>
    </Box>
  );
}
