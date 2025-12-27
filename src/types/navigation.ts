import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Setup: undefined;
  PlayerNames: undefined;
  PassDevice: undefined;
  RoleReveal: undefined;
  Discussion: undefined;
  Voting: undefined;
  VotingResults: undefined;
  Results: undefined;
};

export type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}