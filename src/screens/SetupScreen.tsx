import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../components/common/ScreenContainer';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Counter } from '../components/common/Counter';
import { CategoryGrid } from '../components/game/CategoryGrid';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../i18n';
import { defaultCategories } from '../data/categories';
import { getMaxImpostors } from '../utils/gameLogic';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { ScreenNavigationProp } from '../types/navigation';

export const SetupScreen: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { state, dispatch } = useGame();
  const { t } = useLanguage();
  const { settings } = state;

  const maxImpostors = getMaxImpostors(settings.playerCount);
  const canContinue = settings.selectedCategory !== null;

  const handleContinue = () => {
    if (canContinue) {
      navigation.navigate('PlayerNames');
    }
  };

  const maxImpostorsText = t.setup.maxImpostors
    .replace('{{count}}', String(maxImpostors))
    .replace('{{players}}', String(settings.playerCount));

  return (
    <ScreenContainer>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← {t.back}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.setup.title}</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Player Count */}
        <Card style={styles.section}>
          <Counter
            label={t.setup.players}
            value={settings.playerCount}
            min={3}
            max={10}
            onIncrement={() =>
              dispatch({
                type: 'SET_PLAYER_COUNT',
                payload: settings.playerCount + 1,
              })
            }
            onDecrement={() =>
              dispatch({
                type: 'SET_PLAYER_COUNT',
                payload: settings.playerCount - 1,
              })
            }
          />
        </Card>

        {/* Impostor Count */}
        <Card style={styles.section}>
          <Counter
            label={t.setup.impostors}
            value={settings.impostorCount}
            min={1}
            max={maxImpostors}
            onIncrement={() =>
              dispatch({
                type: 'SET_IMPOSTOR_COUNT',
                payload: settings.impostorCount + 1,
              })
            }
            onDecrement={() =>
              dispatch({
                type: 'SET_IMPOSTOR_COUNT',
                payload: settings.impostorCount - 1,
              })
            }
          />
          <Text style={styles.hint}>{maxImpostorsText}</Text>
        </Card>

        {/* Category Selection */}
        <CategoryGrid
          categories={defaultCategories}
          selectedCategory={settings.selectedCategory}
          onSelectCategory={(category) =>
            dispatch({ type: 'SET_CATEGORY', payload: category })
          }
        />

        {/* Selected Category Info */}
        {settings.selectedCategory && (
          <Card variant="highlighted" style={styles.section}>
            <Text style={styles.selectedLabel}>{t.setup.selected}</Text>
            <View style={styles.selectedCategory}>
              <Text style={styles.selectedIcon}>
                {settings.selectedCategory.icon}
              </Text>
              <Text style={styles.selectedName}>
                {settings.selectedCategory.name}
              </Text>
            </View>
          </Card>
        )}
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <Button
          title={t.setup.startGame}
          onPress={handleContinue}
          disabled={!canContinue}
          size="lg"
          fullWidth
        />
        {!canContinue && (
          <Text style={styles.footerHint}>{t.setup.selectCategoryHint}</Text>
        )}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  backButton: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.sm,
    color: colors.primary,
  },
  headerTitle: {
    fontFamily: typography.fonts.monoBold,
    fontSize: typography.sizes.lg,
    color: colors.text,
    marginLeft: spacing.md,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  section: {
    marginBottom: spacing.md,
  },
  hint: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  selectedLabel: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.xs,
    color: colors.primary,
    letterSpacing: 2,
    marginBottom: spacing.sm,
  },
  selectedCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedIcon: {
    fontSize: 32,
    marginRight: spacing.sm,
  },
  selectedName: {
    fontFamily: typography.fonts.monoBold,
    fontSize: typography.sizes.xl,
    color: colors.primary,
  },
  footer: {
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerHint: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});