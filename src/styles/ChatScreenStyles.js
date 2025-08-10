import { StyleSheet } from 'react-native';

export const createChatScreenStyles = (colors, spacing, fontSizes, fontWeights, shadows, borderRadius) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  // Header styles
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.small,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.sm,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    color: colors.textLight,
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semiBold,
  },
  headerSubtitle: {
    color: colors.textLight,
    fontSize: fontSizes.sm,
    opacity: 0.8,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
  borderRadius: borderRadius.sm,
  backgroundColor: colors.primaryLight,
  width: 40, 
  height: 40,
  justifyContent: 'center', 
  alignItems: 'center',    
  },
  headerButtonText: {
    rfontSize: fontSizes.xl ?? 20,
    lineHeight: 24,
    color: colors.textLight,
  },
  
  // Messages container
  messagesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  
  // Input container
  inputContainer: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    ...shadows.small,
  },
  
  // Placeholder styles
  placeholder: {
    fontSize: fontSizes.md,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  messageCount: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});