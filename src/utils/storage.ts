import { Platform } from 'react-native';

/**
 * Cross-platform storage utility.
 * On native platforms, uses AsyncStorage.
 * On web, uses localStorage.
 */
const storage = {
  getItem: async (key: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    }
    const { default: AsyncStorage } = await import(
      '@react-native-async-storage/async-storage'
    );
    return AsyncStorage.getItem(key);
  },

  setItem: async (key: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      try {
        localStorage.setItem(key, value);
      } catch {
        // Ignore localStorage errors
      }
      return;
    }
    const { default: AsyncStorage } = await import(
      '@react-native-async-storage/async-storage'
    );
    await AsyncStorage.setItem(key, value);
  },
};

export default storage;
