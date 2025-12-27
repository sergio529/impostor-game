import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useLanguage, Language } from '../../i18n';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';

interface LanguageSelectorProps {
  style?: object;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ style }) => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = async (lang: Language) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLanguage(lang);
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{t.home.language}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, language === 'en' && styles.buttonActive]}
          onPress={() => handleLanguageChange('en')}
          activeOpacity={0.7}
        >
          <Text style={styles.flag}>🇺🇸</Text>
          <Text
            style={[styles.buttonText, language === 'en' && styles.buttonTextActive]}
          >
            EN
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, language === 'es' && styles.buttonActive]}
          onPress={() => handleLanguageChange('es')}
          activeOpacity={0.7}
        >
          <Text style={styles.flag}>🇪🇸</Text>
          <Text
            style={[styles.buttonText, language === 'es' && styles.buttonTextActive]}
          >
            ES
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  label: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.xs,
    color: colors.textMuted,
    marginBottom: spacing.sm,
    letterSpacing: 1,
  },
  buttons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  buttonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryGlow,
  },
  flag: {
    fontSize: 18,
    marginRight: spacing.xs,
  },
  buttonText: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  buttonTextActive: {
    color: colors.primary,
  },
});