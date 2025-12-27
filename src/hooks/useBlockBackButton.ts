import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export const useBlockBackButton = (shouldBlock: boolean = true): void => {
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