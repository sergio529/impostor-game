import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
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

export const VotingResultsScreen: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { state, dispatch, aliveImpostors, aliveCrewmates } = useGame();
  const { t } = useLanguage();
  const { lastVoteResult } = state;

  useBlockBackButton(true);

  if (!lastVoteResult) {
    return (
      <ScreenContainer centered>
        <Text style={styles.loadingText}>Loading...</Text>
      </ScreenContainer>
    );
  }

  const { eliminatedPlayer, wasImpostor, isTie, voteSummary, gameEnded } = lastVoteResult;

  const handleContinueGame = () => {
    dispatch({ type: 'CONTINUE_GAME' });
    navigation.navigate('Discussion');
  };

  const handleSeeResults = () => {
    dispatch({ type: 'END_GAME' });
    // Use reset to prevent going back
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Results' }],
      })
    );
  };

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{t.votingResults.title}</Text>
        </View>

        {/* Elimination Result */}
        {isTie ? (
          <Card style={styles.resultCard}>
            <Text style={styles.tieIcon}>⚖️</Text>
            <Text style={styles.tieTitle}>{t.votingResults.noElimination}</Text>
            <Text style={styles.tieSubtitle}>{t.votingResults.tieVote}</Text>
          </Card>
        ) : eliminatedPlayer ? (
          <Card
            variant={wasImpostor ? 'highlighted' : 'danger'}
            style={styles.resultCard}
          >
            <Text style={styles.eliminatedLabel}>{t.votingResults.eliminated}</Text>
            <PlayerAvatar
              playerNumber={eliminatedPlayer.id}
              size="xl"
              variant={wasImpostor ? 'active' : 'eliminated'}
            />
            <Text style={styles.eliminatedName}>{eliminatedPlayer.displayName}</Text>
            <Text
              style={[
                styles.eliminatedRole,
                wasImpostor ? styles.roleImpostor : styles.roleCrewmate,
              ]}
            >
              {wasImpostor
                ? `🎭 ${t.votingResults.wasImpostor}`
                : `👤 ${t.votingResults.wasCrewmate}`}
            </Text>
          </Card>
        ) : null}

        {/* Game Status */}
        <Card style={styles.statusCard}>
          <View style={styles.statusRow}>
            <Text style={styles.statusIcon}>🎭</Text>
            <Text style={styles.statusText}>
              {t.votingResults.impostorsRemaining.replace(
                '{{count}}',
                String(aliveImpostors.length)
              )}
            </Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusIcon}>👥</Text>
            <Text style={styles.statusText}>
              {t.votingResults.crewmatesRemaining.replace(
                '{{count}}',
                String(aliveCrewmates.length)
              )}
            </Text>
          </View>
        </Card>

        {/* Vote Summary */}
        {voteSummary && voteSummary.length > 0 && (
          <Card style={styles.voteSummaryCard}>
            <Text style={styles.voteSummaryLabel}>{t.results.voteSummary}</Text>
            {[...voteSummary]
              .sort((a, b) => b.votesReceived - a.votesReceived)
              .map((vote) => (
                <View key={vote.playerId} style={styles.voteRow}>
                  <View style={styles.votePlayer}>
                    <PlayerAvatar playerNumber={vote.playerId} size="sm" />
                    <Text style={styles.votePlayerName}>{vote.playerName}</Text>
                  </View>
                  <View style={styles.voteCount}>
                    <Text style={styles.voteCountText}>
                      {vote.votesReceived}{' '}
                      {vote.votesReceived === 1 ? t.results.vote : t.results.votes}
                    </Text>
                  </View>
                </View>
              ))}
          </Card>
        )}

        {/* Game End Notice */}
        {gameEnded && (
          <Card
            variant={aliveImpostors.length === 0 ? 'highlighted' : 'danger'}
            style={styles.endCard}
          >
            <Text style={styles.endIcon}>
              {aliveImpostors.length === 0 ? '🎉' : '😈'}
            </Text>
            <Text
              style={[
                styles.endText,
                aliveImpostors.length === 0 ? styles.endTextWin : styles.endTextLose,
              ]}
            >
              {aliveImpostors.length === 0
                ? t.results.crewmatesWin
                : t.results.impostorsWin}
            </Text>
          </Card>
        )}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.footer}>
        {gameEnded ? (
          <Button
            title={t.votingResults.gameOver}
            onPress={handleSeeResults}
            size="lg"
            fullWidth
          />
        ) : (
          <Button
            title={t.votingResults.continueGame}
            onPress={handleContinueGame}
            size="lg"
            fullWidth
          />
        )}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  loadingText: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontFamily: typography.fonts.monoBold,
    fontSize: typography.sizes.xl,
    color: colors.primary,
    letterSpacing: 3,
  },
  resultCard: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    marginBottom: spacing.md,
  },
  tieIcon: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  tieTitle: {
    fontFamily: typography.fonts.monoBold,
    fontSize: typography.sizes.xl,
    color: colors.text,
  },
  tieSubtitle: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  eliminatedLabel: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    letterSpacing: 2,
    marginBottom: spacing.md,
  },
  eliminatedName: {
    fontFamily: typography.fonts.monoBold,
    fontSize: typography.sizes.xxl,
    color: colors.text,
    marginTop: spacing.md,
  },
  eliminatedRole: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.md,
    marginTop: spacing.sm,
  },
  roleImpostor: {
    color: colors.danger,
  },
  roleCrewmate: {
    color: colors.primary,
  },
  statusCard: {
    marginBottom: spacing.md,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statusIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  statusText: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.sm,
    color: colors.text,
  },
  voteSummaryCard: {
    marginBottom: spacing.md,
  },
  voteSummaryLabel: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    letterSpacing: 2,
    marginBottom: spacing.md,
  },
  voteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  votePlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  votePlayerName: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.sm,
    color: colors.text,
    marginLeft: spacing.sm,
  },
  voteCount: {
    backgroundColor: colors.surfaceLight,
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.sm,
    borderRadius: spacing.xs,
  },
  voteCountText: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
  endCard: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  endIcon: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  endText: {
    fontFamily: typography.fonts.monoBold,
    fontSize: typography.sizes.lg,
    letterSpacing: 2,
  },
  endTextWin: {
    color: colors.primary,
  },
  endTextLose: {
    color: colors.danger,
  },
  footer: {
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});