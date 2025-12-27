import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
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

export const RoleRevealScreen: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { state, dispatch, currentPlayer } = useGame();
  const { t } = useLanguage();
  const [isRevealed, setIsRevealed] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  useBlockBackButton(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRevealed(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      // Same haptic feedback for all roles (to not reveal by sound)
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    // Start hiding animation
    setIsHiding(true);
    
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      dispatch({ type: 'PLAYER_SAW_ROLE' });
      
      // Small delay before transitioning
      setTimeout(() => {
        dispatch({ type: 'HIDE_ROLE' });
        
        const nextIndex = state.currentPlayerIndex + 1;
        if (nextIndex >= state.players.length) {
          navigation.navigate('Discussion');
        } else {
          navigation.navigate('PassDevice');
        }
      }, 500);
    });
  };

  if (!currentPlayer) {
    return null;
  }

  const isImpostor = currentPlayer.isImpostor;

  // Show hiding screen during transition
  if (isHiding) {
    return (
      <ScreenContainer centered>
        <View style={styles.hidingContainer}>
          <Text style={styles.hidingText}>{t.roleReveal.hiding}</Text>
          <View style={styles.loadingDots}>
            <Text style={styles.dot}>●</Text>
            <Text style={styles.dot}>●</Text>
            <Text style={styles.dot}>●</Text>
          </View>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer centered>
      <View style={styles.content}>
        {/* Player Info - Always green/neutral */}
        <View style={styles.playerInfo}>
          <PlayerAvatar
            playerNumber={currentPlayer.id}
            size="lg"
            variant="active"
          />
          <Text style={styles.playerName}>{currentPlayer.displayName}</Text>
        </View>

        {/* Role Card */}
        {!isRevealed ? (
          <Card style={styles.loadingCard}>
            <Text style={styles.loadingText}>{t.roleReveal.decrypting}</Text>
            <View style={styles.loadingDots}>
              <Text style={styles.dot}>●</Text>
              <Text style={styles.dot}>●</Text>
              <Text style={styles.dot}>●</Text>
            </View>
          </Card>
        ) : (
          <Animated.View style={[styles.animatedContainer, { opacity: fadeAnim }]}>
            {/* All cards use same styling - no color differentiation */}
            <Card variant="highlighted" style={styles.roleCard}>
              {/* Role Title */}
              <Text style={styles.roleLabel}>{t.roleReveal.yourRole}</Text>
              <Text style={styles.roleTitle}>
                {isImpostor ? t.roleReveal.impostor : t.roleReveal.crewmate}
              </Text>

              {/* Divider */}
              <View style={styles.divider} />

              {/* Secret Word */}
              <Text style={styles.wordLabel}>{t.roleReveal.secretWord}</Text>
              <Text style={styles.secretWord}>
                {currentPlayer.secretWord}
              </Text>

              {/* Role Instructions */}
              <View style={styles.instructions}>
                <Text style={styles.instructionIcon}>
                  {isImpostor ? '🎭' : '🔍'}
                </Text>
                <Text style={styles.instructionText}>
                  {isImpostor ? t.roleReveal.impostorTip : t.roleReveal.crewmateTip}
                </Text>
              </View>
            </Card>
          </Animated.View>
        )}

        {/* Next Button - Always same color */}
        {isRevealed && !isHiding && (
          <View style={styles.buttonContainer}>
            <Button
              title={t.roleReveal.gotIt}
              onPress={handleNext}
              variant="primary"
              size="lg"
              fullWidth
            />
            <Text style={styles.buttonHint}>{t.roleReveal.memorizeHint}</Text>
          </View>
        )}
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
  hidingContainer: {
    alignItems: 'center',
  },
  hidingText: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.lg,
    color: colors.textSecondary,
    letterSpacing: 3,
  },
  playerInfo: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  playerName: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.md,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  loadingCard: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    width: '100%',
  },
  loadingText: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.lg,
    color: colors.textSecondary,
    letterSpacing: 3,
  },
  loadingDots: {
    flexDirection: 'row',
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  dot: {
    fontSize: 20,
    color: colors.primary,
  },
  animatedContainer: {
    width: '100%',
  },
  roleCard: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    width: '100%',
  },
  roleLabel: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
    letterSpacing: 2,
    marginBottom: spacing.sm,
  },
  roleTitle: {
    fontFamily: typography.fonts.monoBold,
    fontSize: typography.sizes.xxxl,
    color: colors.primary,
    letterSpacing: 4,
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
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
    fontSize: typography.sizes.xxl,
    color: colors.primary,
  },
  instructions: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
  },
  instructionIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  instructionText: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    marginTop: spacing.xl,
    width: '100%',
  },
  buttonHint: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});