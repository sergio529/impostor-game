import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Player } from '../../types/game';
import { PlayerAvatar } from './PlayerAvatar';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';

interface VoteCardProps {
  player: Player;
  onVote: (playerId: number) => void;
  isSelected?: boolean;
  disabled?: boolean;
}

export const VoteCard: React.FC<VoteCardProps> = ({
  player,
  onVote,
  isSelected = false,
  disabled = false,
}) => {
  const handlePress = async () => {
    if (!disabled) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      onVote(player.id);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.containerSelected,
        disabled && styles.containerDisabled,
      ]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <PlayerAvatar
        playerNumber={player.id}
        size="md"
        variant={isSelected ? 'active' : 'default'}
      />
      <View style={styles.info}>
        <Text style={[styles.name, isSelected && styles.nameSelected]}>
          {player.displayName}
        </Text>
      </View>
      {isSelected && (
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  containerSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryGlow,
  },
  containerDisabled: {
    opacity: 0.5,
  },
  info: {
    flex: 1,
    marginLeft: spacing.md,
  },
  name: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.md,
    color: colors.text,
  },
  nameSelected: {
    color: colors.primary,
  },
  checkmark: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    fontFamily: typography.fonts.monoBold,
    fontSize: typography.sizes.lg,
    color: colors.background,
  },
});