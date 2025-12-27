import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from '../components/common/ScreenContainer';
import { Button } from '../components/common/Button';
import { LanguageSelector } from '../components/game/LanguageSelector';
import { HowToPlayModal } from '../components/game/HowToPlayModal';
import { useLanguage } from '../i18n';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { ScreenNavigationProp } from '../types/navigation';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { t } = useLanguage();
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  return (
    <ScreenContainer centered>
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Text style={styles.logoIcon}>👁️</Text>
          <Text style={styles.title}>{t.home.title}</Text>
          <Text style={styles.subtitle}>{t.home.subtitle}</Text>
        </View>

        {/* Decorative Line */}
        <View style={styles.divider}>
          <Text style={styles.dividerText}>══════════════════════</Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <Button
            title={t.home.newGame}
            onPress={() => navigation.navigate('Setup')}
            size="lg"
            fullWidth
          />

          <Button
            title={t.home.howToPlay}
            onPress={() => setShowHowToPlay(true)}
            variant="secondary"
            size="md"
            fullWidth
          />
        </View>

        {/* Language Selector */}
        <LanguageSelector style={styles.languageSelector} />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.version}>v1.0.0</Text>
      </View>

      {/* How to Play Modal */}
      <HowToPlayModal
        visible={showHowToPlay}
        onClose={() => setShowHowToPlay(false)}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    width: '100%',
    paddingHorizontal: spacing.lg,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoIcon: {
    fontSize: 72,
    marginBottom: spacing.md,
  },
  title: {
    fontFamily: typography.fonts.monoBold,
    fontSize: typography.sizes.huge,
    color: colors.primary,
    letterSpacing: 6,
  },
  subtitle: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  divider: {
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  dividerText: {
    fontFamily: typography.fonts.mono,
    color: colors.border,
    fontSize: typography.sizes.sm,
  },
  actions: {
    gap: spacing.md,
  },
  languageSelector: {
    marginTop: spacing.xl,
  },
  footer: {
    position: 'absolute',
    bottom: spacing.xl,
    alignItems: 'center',
  },
  version: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
  },
});