import { useCallback } from 'react';
import { BackHandler, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

/**
 * Blocks the Android hardware back button when active.
 * No-op on web (no hardware back button).
 */
export const useBlockBackButton = (shouldBlock: boolean = true): void => {
  // No-op on web — no hardware back button
  if (Platform.OS === 'web') {
    return;
  }

  useFocusEffect(
    useCallback(() => {
      if (!shouldBlock) {
        return;
      }

      const onBackPress = (): boolean => {
        // Return true to prevent default behavior (going back)
        return true;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => {
        subscription.remove();
      };
    }, [shouldBlock])
  );
};
