import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useLanguage } from '../../i18n';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';

interface HowToPlayModalProps {
  visible: boolean;
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({
  visible,
  onClose,
}) => {
  const { t } = useLanguage();

  return (
    <Modal visible={visible} onClose={onClose}>
      <View style={styles.header}>
        <Text style={styles.title}>{t.howToPlay.title}</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Objective */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.howToPlay.objective}</Text>
          <Text style={styles.sectionText}>{t.howToPlay.objectiveText}</Text>
        </View>

        {/* Roles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.howToPlay.rolesTitle}</Text>

          <View style={styles.roleCard}>
            <Text style={styles.roleIcon}>👤</Text>
            <View style={styles.roleInfo}>
              <Text style={styles.roleName}>{t.howToPlay.crewmateRole}</Text>
              <Text style={styles.roleDesc}>{t.howToPlay.crewmateDesc}</Text>
            </View>
          </View>

          <View style={[styles.roleCard, styles.roleCardDanger]}>
            <Text style={styles.roleIcon}>🎭</Text>
            <View style={styles.roleInfo}>
              <Text style={[styles.roleName, styles.roleNameDanger]}>
                {t.howToPlay.impostorRole}
              </Text>
              <Text style={styles.roleDesc}>{t.howToPlay.impostorDesc}</Text>
            </View>
          </View>
        </View>

        {/* Gameplay */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.howToPlay.gameplayTitle}</Text>
          {[
            t.howToPlay.step1,
            t.howToPlay.step2,
            t.howToPlay.step3,
            t.howToPlay.step4,
            t.howToPlay.step5,
            t.howToPlay.step6,
          ].map((step, index) => (
            <View key={index} style={styles.stepRow}>
              <Text style={styles.stepNumber}>{index + 1}</Text>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        {/* Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.howToPlay.tipsTitle}</Text>
          {[t.howToPlay.tip1, t.howToPlay.tip2, t.howToPlay.tip3].map(
            (tip, index) => (
              <View key={index} style={styles.tipRow}>
                <Text style={styles.tipIcon}>💡</Text>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            )
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button title={t.howToPlay.gotIt} onPress={onClose} fullWidth />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
  },
  title: {
    fontFamily: typography.fonts.monoBold,
    fontSize: typography.sizes.xl,
    color: colors.primary,
    letterSpacing: 2,
  },
  scroll: {
    maxHeight: 400,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontFamily: typography.fonts.monoBold,
    fontSize: typography.sizes.sm,
    color: colors.primary,
    letterSpacing: 2,
    marginBottom: spacing.md,
  },
  sectionText: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.sm,
    color: colors.text,
    lineHeight: 22,
  },
  roleCard: {
    flexDirection: 'row',
    backgroundColor: colors.primaryGlow,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  roleCardDanger: {
    backgroundColor: colors.dangerGlow,
    borderColor: colors.danger,
  },
  roleIcon: {
    fontSize: 28,
    marginRight: spacing.md,
  },
  roleInfo: {
    flex: 1,
  },
  roleName: {
    fontFamily: typography.fonts.monoBold,
    fontSize: typography.sizes.md,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  roleNameDanger: {
    color: colors.danger,
  },
  roleDesc: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.sm,
    color: colors.text,
    lineHeight: 20,
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  stepNumber: {
    fontFamily: typography.fonts.monoBold,
    fontSize: typography.sizes.sm,
    color: colors.primary,
    width: 24,
  },
  stepText: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.sm,
    color: colors.text,
    flex: 1,
    lineHeight: 20,
  },
  tipRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
    alignItems: 'flex-start',
  },
  tipIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
  },
  tipText: {
    fontFamily: typography.fonts.mono,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});