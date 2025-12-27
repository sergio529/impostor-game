import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../components/common/ScreenContainer';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { PlayerAvatar } from '../components/game/PlayerAvatar';
import { VoteCard } from '../components/game/VoteCard';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../i18n';
import { useBlockBackButton } from '../hooks/useBlockBackButton';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { ScreenNavigationProp } from '../types/navigation';

export const VotingScreen: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { state, dispatch, currentVoter, alivePlayers } = useGame();
  const { t } = useLanguage();
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);

  useBlockBackButton(true);

  // Handle navigation when all votes are cast
  useEffect(() => {
    const allVoted = alivePlayers.every(p => p.hasVoted);
    if (allVoted && alivePlayers.length > 0) {
      navigation.navigate('VotingResults');
    }
  }, [alivePlayers, navigation]);

  // Handle case when there's no current voter
  useEffect(() => {
    if (!currentVoter && alivePlayers.length > 0) {
      const allVoted = alivePlayers.every(p => p.hasVoted);
      if (allVoted) {
        navigation.navigate('VotingResults');
      }
    }
  }, [currentVoter, alivePlayers, navigation]);

  const handleVote = (playerId: number) => {
    setSelectedPlayerId(playerId);
  };

  const handleConfirmVote = () => {
    if (!currentVoter) return;

    dispatch({
      type: 'CAST_VOTE',
      payload: {
        voterId: currentVoter.id,
        targetId: selectedPlayerId,
      },
    });

    setSelectedPlayerId(null);
    dispatch({ type: 'NEXT_VOTER' });
  };

  const handleSkipVote = () => {
    if (!currentVoter) return;

    dispatch({
      type: 'CAST_VOTE',
      payload: {
        voterId: currentVoter.id,
        targetId: null,
      },
    });

    setSelectedPlayerId(null);
    dispatch({ type: 'NEXT_VOTER' });
  };

  // Show loading or nothing while waiting for navigation
  if (!currentVoter) {
    return (
      <ScreenContainer centered>
        <Text style={styles.loadingText}>Loading...</Text>
      </ScreenContainer>
    );
  }

  // Only show alive players that the current voter can vote for
  const votablePlayers = alivePlayers.filter(
    (player) => player.id !== currentVoter.id
  );

  // Count voters
  const alivePlayersWhoVoted = alivePlayers.filter(p => p.hasVoted);
  const currentVoterNumber = alivePlayersWhoVoted.length + 1;
  const totalVoters = alivePlayers.length;

  const voterOfText = t.voting.voterOf
    .replace('{{current}}', String(currentVoterNumber))
    .replace('{{total}}', String(totalVoters));

  return (
    <ScreenContainer>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.phase}>{t.voting.title}</Text>
          <Text style={styles.voterCount}>{voterOfText}</Text>
          {state.voteRound > 1 && (
            <Text style={styles.roundInfo}>
              {t.discussion.round.replace('{{number}}', String(state.voteRound))}
            </Text>
          )}
        </View>

        {/* Current Voter */}
        <Card variant="highlighted" style={styles.voterCard}>
          <PlayerAvatar
            playerNumber={currentVoter.id}
            size="lg"
            variant="active"
          />
          <View style={styles.voterInfo}>
            <Text style={styles.voterLabel}>{t.voting.currentVoter}</Text>
            <Text style={styles.voterName}>{currentVoter.displayName}</Text>
          </View>
        </Card>

        {/* Instructions */}
        <Text style={styles.instruction}>{t.voting.instruction}</Text>

        {/* Player List */}
        <ScrollView
          style={styles.playerList}
          contentContainerStyle={styles.playerListContent}
          showsVerticalScrollIndicator={false}
        >
          {votablePlayers.map((player) => (
            <VoteCard
              key={player.id}
              player={player}
              onVote={handleVote}
              isSelected={selectedPlayerId === player.id}
            />
          ))}
        </ScrollView>

        {/* Actions */}
        <View style={styles.footer}>
          <Button
            title={t.voting.confirmVote}
            onPress={handleConfirmVote}
            disabled={selectedPlayerId === null}
            size="lg"
            fullWidth
          />

          {state.settings.allowSkipVote && (
            <Button
              title={t.voting.skipVote}
              onPress={handleSkipVote}
              variant="ghost"
              size="md"
              fullWidth
              style={styles.skipButton}
            />
          )}
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
  loadingText: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  phase: {
    fontFamily: typography.fonts.monoBold,
    fontSize: typography.sizes.xl,
    color: colors.warning,
    letterSpacing: 3,
  },
  voterCount: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  roundInfo: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    marginTop: spacing.xxs,
  },
  voterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  voterInfo: {
    marginLeft: spacing.md,
  },
  voterLabel: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    letterSpacing: 1,
  },
  voterName: {
    fontFamily: typography.fonts.monoBold,
    fontSize: typography.sizes.lg,
    color: colors.primary,
  },
  instruction: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  playerList: {
    flex: 1,
  },
  playerListContent: {
    paddingBottom: spacing.md,
  },
  footer: {
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  skipButton: {
    marginTop: spacing.sm,
  },
});