import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'highlighted' | 'danger';
  style?: ViewStyle;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  style,
  noPadding = false,
}) => {
  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'highlighted':
        return styles.highlighted;
      case 'danger':
        return styles.danger;
      default:
        return styles.default;
    }
  };

  return (
    <View
      style={[
        styles.card,
        getVariantStyles(),
        noPadding && styles.noPadding,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  noPadding: {
    padding: 0,
  },
  default: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
  },
  highlighted: {
    backgroundColor: colors.primaryGlow,
    borderColor: colors.primary,
  },
  danger: {
    backgroundColor: colors.dangerGlow,
    borderColor: colors.danger,
  },
});