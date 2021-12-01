import * as React from 'react';
import {RouteProp} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationProp,
  TransitionPresets,
} from '@react-navigation/stack';
import {useDrawerStatus} from '@react-navigation/drawer';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import HomeStack from '../homeStack/HomeStack';
import ComicStack from '../comicStack/ComicStack';

type SideDrawerParamList = {
  Home: undefined;
  Comics: undefined;
};

export type SideDrawerNavProps<T extends keyof SideDrawerParamList> = {
  navigation: StackNavigationProp<SideDrawerParamList, T>;
  route: RouteProp<SideDrawerParamList, T>;
};

const Stack = createStackNavigator<SideDrawerParamList>();

export default function AnimatedDrawer() {
  const status = useDrawerStatus();
  const progress = useDerivedValue(() => {
    return status == 'open' ? 1 : 0;
  });
  const flip = useDerivedValue(() => {
    return status == 'open' ? 2 : 1;
  });
  const dStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      progress.value,
      [0, 1],
      [1, 0.8],
      Extrapolate.CLAMP,
    );
    const borderRadius = interpolate(
      progress.value,
      [0, 1],
      [0, 25],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{scale: withTiming(scale, {duration: 300})}],
      borderRadius,
    };
  }, [progress]);

  return (
    <Animated.View style={[{flex: 1, overflow: 'hidden'}, dStyle]}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          gestureEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          // animationEnabled: false,
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeStack} />
        <Stack.Screen name="Comics" component={ComicStack} />
      </Stack.Navigator>
    </Animated.View>
  );
}
