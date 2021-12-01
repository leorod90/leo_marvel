import * as React from 'react';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp, TransitionPresets} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import DetailsScreen from '../../screens/DetailsScreen/DetailsScreen';
import {forFade} from '../StackAnimation';

type HomeStackParamList = {
  HomeScreen: undefined;
  DetailsScreen: {item: any};
};

export type HomeStackNavProps<T extends keyof HomeStackParamList> = {
  navigation: StackNavigationProp<HomeStackParamList, T>;
  route: RouteProp<HomeStackParamList, T>;
};

const Stack = createSharedElementStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        // cardStyleInterpolator: forFade,
        ...TransitionPresets.FadeFromBottomAndroid,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        sharedElements={(route, otherRoute, showing) => {
          // if (showing) {
          const {item} = route.params;
          return [item.title];
          // }
        }}
      />
    </Stack.Navigator>
  );
}
