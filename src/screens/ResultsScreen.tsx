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

export const ResultsScreen: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { state, dispatch, impostors } = useGame();
  const { t } = useLanguage();
  const { gameResult } = state;

  useBlockBackButton(true);

  const handlePlayAgain = () => {
    dispatch({ type: 'NEW_ROUND' });
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'PassDevice' }],
      })
    );
  };

  const handleNewGame = () => {
    dispatch({ type: 'RESET_GAME' });
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Setup' }],
      })
    );
  };

  const handleHome = () => {
    dispatch({ type: 'RESET_GAME' });
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    );
  };

  // If no game result, show a fallback UI with navigation options
  if (!gameResult) {
    return (
      <ScreenContainer centered>
        <View style={styles.noResultContainer}>
          <Text style={styles.noResultText}>No game results available</Text>
          <Button
            title={t.results.homeButton}
            onPress={handleHome}
            size="lg"
            style={styles.noResultButton}
          />
        </View>
      </ScreenContainer>
    );
  }

  const { crewmatesWin, eliminatedPlayers, survivingPlayers, allVoteRounds } = gameResult;

  const lastVoteRound = allVoteRounds && allVoteRounds.length > 0
    ? allVoteRounds[allVoteRounds.length - 1]
    : null;

  const voteSummary = lastVoteRound?.voteSummary || [];

  return (
    <ScreenContainer>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Result Header */}
        <View style={styles.header}>
          <Text style={styles.resultIcon}>{crewmatesWin ? '🎉' : '😈'}</Text>
          <Text
            style={[
              styles.resultTitle,
              crewmatesWin ? styles.resultTitleWin : styles.resultTitleLose,
            ]}
          >
            {crewmatesWin ? t.results.crewmatesWin : t.results.impostorsWin}
          </Text>
          <Text style={styles.resultSubtitle}>
            {crewmatesWin
              ? t.results.allImpostorsEliminated
              : t.results.impostorsMajority}
          </Text>
        </View>

        {/* Secret Word Reveal */}
        <Card style={styles.wordCard}>
          <Text style={styles.wordLabel}>{t.results.secretWordWas}</Text>
          <Text style={styles.secretWord}>{state.secretWord}</Text>
          {state.settings.selectedCategory && (
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryIcon}>
                {state.settings.selectedCategory.icon}
              </Text>
              <Text style={styles.categoryName}>
                {state.settings.selectedCategory.name}
              </Text>
            </View>
          )}
        </Card>

        {/* Impostor Reveal */}
        <Card style={styles.impostorCard}>
          <Text style={styles.impostorLabel}>
            {impostors.length > 1 ? t.results.impostorsWere : t.results.impostorWas}
          </Text>
          <View style={styles.impostorList}>
            {impostors.map((impostor) => (
              <View key={impostor.id} style={styles.impostorItem}>
                <PlayerAvatar
                  playerNumber={impostor.id}
                  size="md"
                  variant="eliminated"
                />
                <Text style={styles.impostorName}>{impostor.displayName}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Eliminated Players */}
        {eliminatedPlayers && eliminatedPlayers.length > 0 && (
          <Card style={styles.playersCard}>
            <Text style={styles.playersLabel}>{t.results.eliminatedPlayers}</Text>
            <View style={styles.playersList}>
              {eliminatedPlayers.map((player) => (
                <View key={player.id} style={styles.playerItem}>
                  <PlayerAvatar
                    playerNumber={player.id}
                    size="sm"
                    variant="eliminated"
                  />
                  <Text style={styles.playerName}>{player.displayName}</Text>
                  <Text
                    style={[
                      styles.playerRole,
                      player.isImpostor ? styles.roleImpostor : styles.roleCrewmate,
                    ]}
                  >
                    {player.isImpostor ? '🎭' : '👤'}
                  </Text>
                </View>
              ))}
            </View>
          </Card>
        )}

        {/* Surviving Players */}
        {survivingPlayers && survivingPlayers.length > 0 && (
          <Card style={styles.playersCard}>
            <Text style={styles.playersLabel}>{t.results.survivingPlayers}</Text>
            <View style={styles.playersList}>
              {survivingPlayers.map((player) => (
                <View key={player.id} style={styles.playerItem}>
                  <PlayerAvatar
                    playerNumber={player.id}
                    size="sm"
                    variant={player.isImpostor ? 'eliminated' : 'active'}
                  />
                  <Text style={styles.playerName}>{player.displayName}</Text>
                  <Text
                    style={[
                      styles.playerRole,
                      player.isImpostor ? styles.roleImpostor : styles.roleCrewmate,
                    ]}
                  >
                    {player.isImpostor ? '🎭' : '👤'}
                  </Text>
                </View>
              ))}
            </View>
          </Card>
        )}

        {/* Vote Summary from last round */}
        {voteSummary.length > 0 && (
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
      </ScrollView>

      {/* Actions */}
      <View style={styles.footer}>
        <Button
          title={t.results.playAgain}
          onPress={handlePlayAgain}
          size="lg"
          fullWidth
        />
        <View style={styles.footerRow}>
          <Button
            title={t.results.newSetup}
            onPress={handleNewGame}
            variant="secondary"
            size="md"
            style={styles.footerButton}
          />
          <Button
            title={t.results.homeButton}
            onPress={handleHome}
            variant="ghost"
            size="md"
            style={styles.footerButton}
          />
        </View>
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
  noResultContainer: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  noResultText: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  noResultButton: {
    minWidth: 200,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  resultIcon: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  resultTitle: {
    fontFamily: typography.fonts.monoBold,
    fontSize: typography.sizes.xxl,
    letterSpacing: 3,
    textAlign: 'center',
  },
  resultTitleWin: {
    color: colors.primary,
  },
  resultTitleLose: {
    color: colors.danger,
  },
  resultSubtitle: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  wordCard: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  wordLabel: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    letterSpacing: 2,
    marginBottom: spacing.sm,
  },
  secretWord: {
    fontFamily: typography.fonts.monoBold,
    fontSize: typography.sizes.xxxl,
    color: colors.primary,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    backgroundColor: colors.surfaceLight,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: spacing.sm,
  },
  categoryIcon: {
    fontSize: 18,
    marginRight: spacing.xs,
  },
  categoryName: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  impostorCard: {
    marginBottom: spacing.md,
  },
  impostorLabel: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    letterSpacing: 2,
    marginBottom: spacing.md,
  },
  impostorList: {
    gap: spacing.sm,
  },
  impostorItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  impostorName: {
    fontFamily: typography.fonts.monoBold,
    fontSize: typography.sizes.md,
    color: colors.danger,
    marginLeft: spacing.md,
  },
  playersCard: {
    marginBottom: spacing.md,
  },
  playersLabel: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    letterSpacing: 2,
    marginBottom: spacing.md,
  },
  playersList: {
    gap: spacing.sm,
  },
  playerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerName: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.sm,
    color: colors.text,
    marginLeft: spacing.sm,
    flex: 1,
  },
  playerRole: {
    fontSize: 16,
  },
  roleImpostor: {
    color: colors.danger,
  },
  roleCrewmate: {
    color: colors.primary,
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
  footer: {
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerRow: {
    flexDirection: 'row',
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  footerButton: {
    flex: 1,
  },
});