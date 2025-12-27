import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import {
  JetBrainsMono_400Regular,
  JetBrainsMono_500Medium,
  JetBrainsMono_700Bold,
} from '@expo-google-fonts/jetbrains-mono';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

import { GameProvider } from './src/context/GameContext';
import { LanguageProvider } from './src/i18n';
import { colors } from './src/theme/colors';
import { RootStackParamList } from './src/types/navigation';

// Screens
import { HomeScreen } from './src/screens/HomeScreen';
import { SetupScreen } from './src/screens/SetupScreen';
import { PlayerNamesScreen } from './src/screens/PlayerNamesScreen';
import { PassDeviceScreen } from './src/screens/PassDeviceScreen';
import { RoleRevealScreen } from './src/screens/RoleRevealScreen';
import { DiscussionScreen } from './src/screens/DiscussionScreen';
import { VotingScreen } from './src/screens/VotingScreen';
import { ResultsScreen } from './src/screens/ResultsScreen';

// Keep splash screen visible while loading
SplashScreen.preventAutoHideAsync();

// Create navigation stack
const Stack = createNativeStackNavigator<RootStackParamList>();

// Custom dark theme for navigation
const DarkTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    notification: colors.danger,
  },
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          JetBrainsMono_400Regular,
          JetBrainsMono_500Medium,
          JetBrainsMono_700Bold,
          Inter_400Regular,
          Inter_500Medium,
          Inter_700Bold,
        });
      } catch (e) {
        console.warn('Error loading fonts:', e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <GameProvider>
          <View style={styles.container} onLayout={onLayoutRootView}>
            <StatusBar style="light" />
            <NavigationContainer theme={DarkTheme}>
              <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                  headerShown: false,
                  animation: 'fade',
                  contentStyle: { backgroundColor: colors.background },
                }}
              >
                {/* Screens where back is allowed */}
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Setup" component={SetupScreen} />
                <Stack.Screen name="PlayerNames" component={PlayerNamesScreen} />

                {/* Game screens - gesture back disabled */}
                <Stack.Screen
                  name="PassDevice"
                  component={PassDeviceScreen}
                  options={{ gestureEnabled: false }}
                />
                <Stack.Screen
                  name="RoleReveal"
                  component={RoleRevealScreen}
                  options={{ gestureEnabled: false }}
                />
                <Stack.Screen
                  name="Discussion"
                  component={DiscussionScreen}
                  options={{ gestureEnabled: false }}
                />
                <Stack.Screen
                  name="Voting"
                  component={VotingScreen}
                  options={{ gestureEnabled: false }}
                />
                <Stack.Screen
                  name="Results"
                  component={ResultsScreen}
                  options={{ gestureEnabled: false }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </GameProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});