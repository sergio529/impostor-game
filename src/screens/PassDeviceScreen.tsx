import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../components/common/ScreenContainer';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { PlayerAvatar } from '../components/game/PlayerAvatar';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../i18n';
import { useBlockBackButton } from '../hooks/useBlockBackButton';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { ScreenNavigationProp } from '../types/navigation';

export const PassDeviceScreen: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { state, dispatch, currentPlayer } = useGame();
  const { t } = useLanguage();

  // Block Android back button
  useBlockBackButton(true);

  const handleReady = () => {
    dispatch({ type: 'PLAYER_READY' });
    navigation.navigate('RoleReveal');
  };

  if (!currentPlayer) {
    return null;
  }

  const playerOfText = t.passDevice.playerOf
    .replace('{{current}}', String(state.currentPlayerIndex + 1))
    .replace('{{total}}', String(state.players.length));

  return (
    <ScreenContainer centered>
      <View style={styles.content}>
        {/* Instructions */}
        <Text style={styles.instruction}>{t.passDevice.instruction}</Text>

        {/* Player Info */}
        <Card variant="highlighted" style={styles.playerCard}>
          <PlayerAvatar
            playerNumber={currentPlayer.id}
            size="xl"
            variant="active"
          />
          <Text style={styles.playerName}>{currentPlayer.displayName}</Text>
        </Card>

        {/* Warning */}
        <View style={styles.warningContainer}>
          <Text style={styles.warningIcon}>⚠️</Text>
          <Text style={styles.warningText}>{t.passDevice.warning}</Text>
        </View>

        {/* Progress */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>{playerOfText}</Text>
          <View style={styles.progressBar}>
            {state.players.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressDot,
                  index <= state.currentPlayerIndex && styles.progressDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Ready Button */}
        <Button
          title={t.passDevice.ready}
          onPress={handleReady}
          size="lg"
          fullWidth
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    width: '100%',
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  instruction: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    letterSpacing: 3,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  playerCard: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xxl,
    marginBottom: spacing.xl,
    width: '100%',
  },
  playerName: {
    fontFamily: typography.fonts.monoBold,
    fontSize: typography.sizes.xxl,
    color: colors.primary,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.warningGlow,
    borderRadius: spacing.sm,
    padding: spacing.md,
    marginBottom: spacing.xl,
    width: '100%',
  },
  warningIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  warningText: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.sm,
    color: colors.warning,
    flex: 1,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  progressText: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  progressBar: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  progressDotActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});