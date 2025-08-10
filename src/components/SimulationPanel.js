import React, { memo, useState } from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const SimulationPanel = memo(({
  isActive,
  mode,
  stats,
  onStartSimulation,
  onStopSimulation,
  onSendSingle,
  onSendBurst,
  onShowTyping,
  onToggleMode,
  formatUptime,
  getTimeUntilNextMessage
}) => {
  const { colors, spacing, fontSizes, fontWeights, borderRadius, shadows } = useTheme();
  const [nextMessageCountdown, setNextMessageCountdown] = useState(0);

  React.useEffect(() => {
    if (isActive && mode === 'auto') {
      const interval = setInterval(() => {
        const timeLeft = Math.ceil(getTimeUntilNextMessage() / 1000);
        setNextMessageCountdown(Math.max(0, timeLeft));
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isActive, mode, getTimeUntilNextMessage]);

  const styles = {
    panel: {
      position: 'absolute',
      top: 80,
      left: spacing.md,
      right: spacing.md,
      backgroundColor: colors.surface,
      borderRadius: borderRadius.lg,
      padding: spacing.md,
      ...shadows.large,
      borderWidth: 1,
      borderColor: colors.border,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.md,
    },
    title: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.semiBold,
      color: colors.text,
    },
    statusIndicator: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: isActive ? colors.success : colors.textSecondary,
      marginLeft: spacing.xs,
    },
    modeSelector: {
      flexDirection: 'row',
      marginBottom: spacing.md,
    },
    modeButton: {
      flex: 1,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.sm,
      borderRadius: borderRadius.sm,
      backgroundColor: colors.buttonSecondary,
      borderWidth: 1,
      borderColor: colors.border,
      marginHorizontal: 2,
      alignItems: 'center',
    },
    modeButtonActive: {
      backgroundColor: colors.buttonPrimary,
      borderColor: colors.buttonPrimary,
    },
    modeButtonText: {
      fontSize: fontSizes.sm,
      color: colors.buttonSecondaryText,
      fontWeight: fontWeights.medium,
    },
    modeButtonTextActive: {
      color: colors.buttonPrimaryText,
    },
    controls: {
      flexDirection: 'row',
      marginBottom: spacing.md,
    },
    controlButton: {
      flex: 1,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.xs,
      borderRadius: borderRadius.sm,
      backgroundColor: colors.buttonPrimary,
      marginHorizontal: 2,
      alignItems: 'center',
    },
    controlButtonSecondary: {
      backgroundColor: colors.accent,
    },
    controlButtonDisabled: {
      backgroundColor: colors.buttonDisabled,
    },
    controlButtonText: {
      fontSize: fontSizes.sm,
      color: colors.buttonPrimaryText,
      fontWeight: fontWeights.medium,
    },
    controlButtonTextDisabled: {
      color: colors.buttonDisabledText,
    },
    stats: {
      backgroundColor: colors.background,
      borderRadius: borderRadius.sm,
      padding: spacing.sm,
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.xs,
    },
    statsLabel: {
      fontSize: fontSizes.sm,
      color: colors.textSecondary,
    },
    statsValue: {
      fontSize: fontSizes.sm,
      color: colors.text,
      fontWeight: fontWeights.medium,
    },
    toggleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.sm,
    },
    toggleLabel: {
      fontSize: fontSizes.md,
      color: colors.text,
      fontWeight: fontWeights.medium,
    }
  };

  const modes = [
    { key: 'auto', label: 'Auto' },
    { key: 'contextual', label: 'Context' },
    { key: 'manual', label: 'Manual' }
  ];

  return (
    <View style={styles.panel}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.title}>Message Simulation</Text>
          <View style={styles.statusIndicator} />
        </View>
      </View>

      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>Active</Text>
        <Switch
          value={isActive}
          onValueChange={isActive ? onStopSimulation : () => onStartSimulation(mode)}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={colors.surface}
        />
      </View>

      <View style={styles.modeSelector}>
        {modes.map((modeOption) => (
          <TouchableOpacity
            key={modeOption.key}
            style={[
              styles.modeButton,
              mode === modeOption.key && styles.modeButtonActive
            ]}
            onPress={() => onToggleMode(modeOption.key)}
          >
            <Text style={[
              styles.modeButtonText,
              mode === modeOption.key && styles.modeButtonTextActive
            ]}>
              {modeOption.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={onSendSingle}
        >
          <Text style={styles.controlButtonText}>Single</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.controlButton, styles.controlButtonSecondary]}
          onPress={onSendBurst}
        >
          <Text style={styles.controlButtonText}>Burst</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.controlButton}
          onPress={onShowTyping}
        >
          <Text style={styles.controlButtonText}>Typing</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.stats}>
        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>Messages Sent</Text>
          <Text style={styles.statsValue}>{stats.messagesSent}</Text>
        </View>
        
        <View style={styles.statsRow}>
          <Text style={styles.statsLabel}>Uptime</Text>
          <Text style={styles.statsValue}>{formatUptime()}</Text>
        </View>
        
        {isActive && mode === 'auto' && (
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Next Message</Text>
            <Text style={styles.statsValue}>
              {nextMessageCountdown > 0 ? `${nextMessageCountdown}s` : 'Soon...'}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
});

SimulationPanel.displayName = 'SimulationPanel';

export default SimulationPanel;