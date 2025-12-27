import React, { useState } from 'react';
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
  const { state, dispatch, currentVoter } = useGame();
  const { t } = useLanguage();
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);

  // Block Android back button
  useBlockBackButton(true);

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

    const nextVoterIndex = state.currentVoterIndex + 1;
    if (nextVoterIndex >= state.players.length) {
      navigation.navigate('Results');
    }
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

    const nextVoterIndex = state.currentVoterIndex + 1;
    if (nextVoterIndex >= state.players.length) {
      navigation.navigate('Results');
    }
  };

  if (!currentVoter) {
    return null;
  }

  const votablePlayers = state.players.filter(
    (player) => player.id !== currentVoter.id
  );

  const voterOfText = t.voting.voterOf
    .replace('{{current}}', String(state.currentVoterIndex + 1))
    .replace('{{total}}', String(state.players.length));

  return (
    <ScreenContainer>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.phase}>{t.voting.title}</Text>
          <Text style={styles.voterCount}>{voterOfText}</Text>
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