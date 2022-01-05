import * as React from 'react';
import {RouteProp} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  StackNavigationProp,
} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import ComicsScreen from '../../screens/ComicsScreen/ComicsScreen';
import DetailsScreen from '../../screens/DetailsScreen/DetailsScreen';
import {forFade} from '../StackAnimation';

type ComicStackParamList = {
  ComicsScreen: undefined;
  DetailsScreen: {item: any};
};

export type ComicStackNavProps<T extends keyof ComicStackParamList> = {
  navigation: StackNavigationProp<ComicStackParamList, T>;
  route: RouteProp<ComicStackParamList, T>;
};

const Stack = createSharedElementStackNavigator();

export default function ComicStack() {
  return (
    <Stack.Navigator
      initialRouteName="ComicsScreen"
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
      }}>
      <Stack.Screen name="ComicsScreen" component={ComicsScreen} />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        sharedElements={(route, otherRoute, showing) => {
          if (otherRoute.name === 'ComicsScreen' && showing) {
            const {item} = route.params;
            return [item.title];
          }
        }}
      />
    </Stack.Navigator>
  );
}
