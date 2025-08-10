import React, { memo } from 'react';
import { TouchableOpacity, Text, View, Animated } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const ScrollToBottomButton = memo(({ 
  visible, 
  unreadCount = 0, 
  onPress 
}) => {
  const { colors, spacing, fontSizes, fontWeights, shadows } = useTheme();

  const styles = {
    container: {
      position: 'absolute',
      bottom: spacing.xl + 60,
      right: spacing.md,
      opacity: visible ? 1 : 0,
    },
    button: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      ...shadows.medium,
    },
    arrow: {
      color: colors.buttonPrimaryText,
      fontSize: 20,
      fontWeight: fontWeights.bold,
    },
    badge: {
      position: 'absolute',
      top: -6,
      right: -6,
      backgroundColor: colors.error,
      borderRadius: 12,
      minWidth: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.surface,
    },
    badgeText: {
      color: colors.buttonPrimaryText,
      fontSize: fontSizes.xs,
      fontWeight: fontWeights.bold,
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <Animated.View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Text style={styles.arrow}>↓</Text>
        
        {unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {unreadCount > 99 ? '99+' : unreadCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
});

ScrollToBottomButton.displayName = 'ScrollToBottomButton';

export default ScrollToBottomButton;