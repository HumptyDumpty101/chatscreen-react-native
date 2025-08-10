import { StyleSheet } from 'react-native';

export const createMessageStyles = (colors, spacing, fontSizes, fontWeights, borderRadius) => StyleSheet.create({
  messageContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    marginVertical: 2,
  },
  
  messageWrapper: {
    maxWidth: '80%',
    alignSelf: 'flex-end',
  },
  
  messageWrapperOther: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: spacing.xs,
  },
  
  messageBubble: {
    backgroundColor: colors.messageUser,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    borderBottomRightRadius: 4,
    minHeight: 44, // Consistent with typing indicator
  },
  
  messageBubbleOther: {
    backgroundColor: colors.messageOther,
    borderBottomRightRadius: borderRadius.lg,
    borderBottomLeftRadius: 4,
    flex: 1,
  },
  
  messageText: {
    fontSize: fontSizes.md,
    color: colors.messageUserText,
    lineHeight: fontSizes.md * 1.4,
  },
  
  messageTextOther: {
    color: colors.messageOtherText,
  },
  
  messageTime: {
    fontSize: fontSizes.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    alignSelf: 'flex-end',
  },
  
  messageTimeOther: {
    alignSelf: 'flex-start',
  },
  
  messageStatus: {
    fontSize: fontSizes.xs,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  
  consecutiveMessage: {
    marginTop: 1,
  },
  
  consecutiveBubble: {
    borderTopRightRadius: 4,
  },
  
  consecutiveBubbleOther: {
    borderTopLeftRadius: 4,
  },
  
  typingIndicator: {
    backgroundColor: colors.messageOther,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    marginVertical: spacing.xs,
    minHeight: 44, // Ensure consistent height with message bubbles
  },
  
  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.textSecondary,
    marginHorizontal: 2,
  },
  
  unreadDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  
  unreadLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.primary,
  },
  
  unreadText: {
    fontSize: fontSizes.sm,
    color: colors.primary,
    fontWeight: fontWeights.medium,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.background,
  },
});