import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../components/common/ScreenContainer';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { PlayerAvatar } from '../components/game/PlayerAvatar';
import { useGame } from '../context/GameContext';
import { useLanguage } from '../i18n';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, borderRadius } from '../theme/spacing';
import { ScreenNavigationProp } from '../types/navigation';

export const PlayerNamesScreen: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { state, dispatch } = useGame();
  const { t } = useLanguage();
  const { settings } = state;

  const [names, setNames] = useState<string[]>(() => {
    const initialNames: string[] = [];
    for (let i = 0; i < settings.playerCount; i++) {
      initialNames.push(settings.playerNames[i] || '');
    }
    return initialNames;
  });

  useEffect(() => {
    setNames((prev) => {
      const newNames: string[] = [];
      for (let i = 0; i < settings.playerCount; i++) {
        newNames.push(prev[i] || '');
      }
      return newNames;
    });
  }, [settings.playerCount]);

  const handleNameChange = (index: number, name: string) => {
    setNames((prev) => {
      const newNames = [...prev];
      newNames[index] = name;
      return newNames;
    });
  };

  const handleContinue = () => {
    dispatch({ type: 'SET_PLAYER_NAMES', payload: names });
    dispatch({ type: 'START_GAME' });
    navigation.navigate('PassDevice');
  };

  const getPlaceholder = (index: number): string => {
    return t.playerNames.placeholder.replace('{{number}}', String(index + 1));
  };

  return (
    <ScreenContainer>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← {t.back}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t.playerNames.title}</Text>
      </View>

      <Text style={styles.subtitle}>{t.playerNames.subtitle}</Text>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {names.map((name, index) => (
          <Card key={index} style={styles.playerCard}>
            <PlayerAvatar playerNumber={index + 1} size="md" />
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(text) => handleNameChange(index, text)}
              placeholder={getPlaceholder(index)}
              placeholderTextColor={colors.textMuted}
              maxLength={15}
              autoCapitalize="words"
              returnKeyType="next"
            />
          </Card>
        ))}
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <Button
          title={t.playerNames.continue}
          onPress={handleContinue}
          size="lg"
          fullWidth
        />
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
  subtitle: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  input: {
    flex: 1,
    marginLeft: spacing.md,
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.md,
    color: colors.text,
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  footer: {
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});