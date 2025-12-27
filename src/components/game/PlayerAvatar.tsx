import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { borderRadius } from '../../theme/spacing';

interface PlayerAvatarProps {
  playerNumber: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'active' | 'eliminated';
}

export const PlayerAvatar: React.FC<PlayerAvatarProps> = ({
  playerNumber,
  size = 'md',
  variant = 'default',
}) => {
  const getSizeValue = (): number => {
    switch (size) {
      case 'sm': return 32;
      case 'md': return 48;
      case 'lg': return 64;
      case 'xl': return 96;
      default: return 48;
    }
  };

  const getFontSize = (): number => {
    switch (size) {
      case 'sm': return typography.sizes.sm;
      case 'md': return typography.sizes.lg;
      case 'lg': return typography.sizes.xl;
      case 'xl': return typography.sizes.xxxl;
      default: return typography.sizes.lg;
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'active':
        return {
          backgroundColor: colors.primaryGlow,
          borderColor: colors.primary,
        };
      case 'eliminated':
        return {
          backgroundColor: colors.dangerGlow,
          borderColor: colors.danger,
        };
      default:
        return {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        };
    }
  };

  const sizeValue = getSizeValue();
  const variantStyles = getVariantStyles();

  return (
    <View
      style={[
        styles.container,
        {
          width: sizeValue,
          height: sizeValue,
          borderRadius: sizeValue / 2,
          ...variantStyles,
        },
      ]}
    >
      <Text
        style={[
          styles.number,
          { fontSize: getFontSize() },
          variant === 'active' && styles.numberActive,
          variant === 'eliminated' && styles.numberEliminated,
        ]}
      >
        {playerNumber}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontFamily: typography.fonts.monoBold,
    color: colors.text,
  },
  numberActive: {
    color: colors.primary,
  },
  numberEliminated: {
    color: colors.danger,
  },
});