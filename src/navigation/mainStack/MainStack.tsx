import * as React from 'react';
import {RouteProp} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import OnboardingScreen from '../../screens/OnboardingScreen/OnboardingScreen';
import DrawerNav from '../drawerNav/DrawerNav';
import {MyTransition} from '../StackAnimation';
import {Easing} from 'react-native-reanimated';

type MainStackParamList = {
  Onboarding: undefined;
  Drawer: undefined;
};

export type MainStackNavProps<T extends keyof MainStackParamList> = {
  navigation: StackNavigationProp<MainStackParamList, T>;
  route: RouteProp<MainStackParamList, T>;
};

const Stack = createStackNavigator<MainStackParamList>();

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerTransparent: true,
        headerShown: false,
      }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Drawer" component={DrawerNav} />
    </Stack.Navigator>
  );
}
