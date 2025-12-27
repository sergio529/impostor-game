import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../components/common/ScreenContainer';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Timer } from '../components/game/Timer';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../i18n';
import { useCountdown } from '../hooks/useCountdown';
import { useBlockBackButton } from '../hooks/useBlockBackButton';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { ScreenNavigationProp } from '../types/navigation';

export const DiscussionScreen: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { state, dispatch } = useGame();
  const { t } = useLanguage();
  const { settings } = state;

  // Block Android back button
  useBlockBackButton(true);

  const hasTimer = settings.discussionTime > 0;

  const { timeLeft, isRunning, isComplete, start, formatTime } = useCountdown({
    initialTime: settings.discussionTime,
    autoStart: hasTimer,
  });

  useEffect(() => {
    if (hasTimer && !isRunning && !isComplete) {
      start();
    }
  }, []);

  const handleStartVoting = () => {
    dispatch({ type: 'START_VOTING' });
    navigation.navigate('Voting');
  };

  const roundText = t.discussion.round.replace('{{number}}', String(state.round));
  const playersInfoText = t.discussion.playersInfo
    .replace('{{players}}', String(state.players.length))
    .replace('{{impostors}}', String(settings.impostorCount));

  return (
    <ScreenContainer>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.phase}>{t.discussion.title}</Text>
          <Text style={styles.round}>{roundText}</Text>
        </View>

        {/* Timer */}
        {hasTimer ? (
          <Timer
            timeLeft={timeLeft}
            formatTime={formatTime}
            isWarning={timeLeft <= 30}
          />
        ) : (
          <Card style={styles.noTimerCard}>
            <Text style={styles.noTimerIcon}>∞</Text>
            <Text style={styles.noTimerText}>{t.discussion.noTimeLimit}</Text>
          </Card>
        )}

        {/* Instructions */}
        <Card style={styles.instructionsCard}>
          <Text style={styles.instructionsTitle}>{t.discussion.howToPlayTitle}</Text>
          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>1</Text>
            <Text style={styles.instructionText}>{t.discussion.rule1}</Text>
          </View>
          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>2</Text>
            <Text style={styles.instructionText}>{t.discussion.rule2}</Text>
          </View>
          <View style={styles.instructionItem}>
            <Text style={styles.instructionNumber}>3</Text>
            <Text style={styles.instructionText}>{t.discussion.rule3}</Text>
          </View>
        </Card>

        {/* Category Reminder */}
        <Card style={styles.categoryCard}>
          <Text style={styles.categoryLabel}>{t.discussion.category}</Text>
          <View style={styles.categoryInfo}>
            <Text style={styles.categoryIcon}>
              {settings.selectedCategory?.icon}
            </Text>
            <Text style={styles.categoryName}>
              {settings.selectedCategory?.name}
            </Text>
          </View>
        </Card>

        {/* Player Count */}
        <View style={styles.playerInfo}>
          <Text style={styles.playerInfoText}>{playersInfoText}</Text>
        </View>

        {/* Start Voting Button */}
        <View style={styles.footer}>
          <Button
            title={isComplete ? t.discussion.timesUp : t.discussion.startVoting}
            onPress={handleStartVoting}
            variant={isComplete ? 'danger' : 'primary'}
            size="lg"
            fullWidth
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.md,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  phase: {
    fontFamily: typography.fonts.monoBold,
    fontSize: typography.sizes.xl,
    color: colors.primary,
    letterSpacing: 3,
  },
  round: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  noTimerCard: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    marginBottom: spacing.lg,
  },
  noTimerIcon: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.giant,
    color: colors.primary,
  },
  noTimerText: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    letterSpacing: 2,
  },
  instructionsCard: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  instructionsTitle: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    letterSpacing: 2,
    marginBottom: spacing.md,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  instructionNumber: {
    fontFamily: typography.fonts.monoBold,
    fontSize: typography.sizes.sm,
    color: colors.primary,
    width: 24,
  },
  instructionText: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.sm,
    color: colors.text,
    flex: 1,
    lineHeight: 20,
  },
  categoryCard: {
    marginBottom: spacing.md,
  },
  categoryLabel: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    letterSpacing: 2,
    marginBottom: spacing.sm,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 28,
    marginRight: spacing.sm,
  },
  categoryName: {
    fontFamily: typography.fonts.monoBold,
    fontSize: typography.sizes.lg,
    color: colors.text,
  },
  playerInfo: {
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  playerInfoText: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.sm,
    color: colors.textMuted,
  },
  footer: {
    marginTop: 'auto',
    paddingVertical: spacing.md,
  },
});