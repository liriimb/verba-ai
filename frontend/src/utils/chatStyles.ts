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
  rowAssistant: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 1,
    mb: 1.25,
  },
  rowUser: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    gap: 1,
    mb: 1.25,
  },

  assistantAvatar: {
    width: 28,
    height: 28,
  },

  userBubble: {
    maxWidth: '78%',
    px: 1.5,
    py: 1,
    borderRadius: 2,
    bgcolor: 'primary.main',
    color: 'primary.contrastText',
    wordBreak: 'break-word',
    overflowWrap: 'anywhere',
  },

  assistantBubble: {
    maxWidth: '78%',
    px: 1.5,
    py: 1,
    borderRadius: 2,
    bgcolor: 'background.paper',
    color: 'text.primary',
    border: '1px solid',
    borderColor: 'divider',
    wordBreak: 'break-word',
    overflowWrap: 'anywhere',
  },

  messageText: {
    whiteSpace: 'pre-wrap',
    overflowWrap: 'anywhere',
    wordBreak: 'break-word',
  },

  timestamp: {
    opacity: 0.7,
    display: 'block',
    mt: 0.5,
  },

  splashOverlay: (leaving: boolean) => ({
    position: 'fixed',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
   justifyContent: 'center',
    bgcolor: 'background.default',
    zIndex: 2000,
    ...(leaving ? { animation: 'splashOut 500ms ease-in both' } : {}),
}),

  splashContent: {
    textAlign: 'center',
    animation: 'splashIn 650ms ease-out both',
  },

  splashIcon: {
    fontSize: 56,
    mb: 1,
  },

  splashTitle: {
    fontWeight: 700,
    mb: 0.5,
  },

  splashSubtitle: {
    opacity: 0.75,
    mb: 2,
  },

  promptsWrap: { mt: 1 },
  promptsHint: { opacity: 0.75, mb: 1 },
  promptButton: { textTransform: 'none', borderRadius: 999 },
} as const;
