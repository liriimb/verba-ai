export const chatStyles = {
  page: {
    py: 3,
  },
  card: {
    p: 2,
    borderRadius: 3,
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 1,
    overflowX: 'hidden',
  },
  messagesPanel: {
    overflowY: 'auto',
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 2,
    p: 2,
    mb: 2,
  },
  emptyHint: { opacity: 0.7 },
  typingRow: { display: 'flex', alignItems: 'center', gap: 1, mt: 1 },
  typingText: { opacity: 0.7 },
  errorText: { mb: 1 },
} as const;
