import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

/**
 * Cross-platform haptic feedback utility.
 * On native platforms, uses expo-haptics. On web, does nothing.
 */
export const triggerHaptic = async (): Promise<void> => {
  if (Platform.OS !== 'web') {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
};
