import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';

interface TimerProps {
  timeLeft: number;
  formatTime: (seconds: number) => string;
  isWarning?: boolean;
}

export const Timer: React.FC<TimerProps> = ({
  timeLeft,
  formatTime,
  isWarning = false,
}) => {
  const showWarning = isWarning || timeLeft <= 30;

  return (
    <View style={[styles.container, showWarning && styles.containerWarning]}>
      <Text style={styles.label}>TIME REMAINING</Text>
      <Text style={[styles.time, showWarning && styles.timeWarning]}>
        {formatTime(timeLeft)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    alignItems: 'center',
  },
  containerWarning: {
    borderColor: colors.warning,
    backgroundColor: colors.warningGlow,
  },
  label: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    letterSpacing: 2,
    marginBottom: spacing.sm,
  },
  time: {
    fontFamily: typography.fonts.monoBold,
    fontSize: typography.sizes.giant,
    color: colors.primary,
  },
  timeWarning: {
    color: colors.warning,
  },
});