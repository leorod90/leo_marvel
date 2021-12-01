import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  ImageBackground,
  Pressable,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Extrapolate,
  useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from '../../components/CustomText';
import {MainStackNavProps} from '../../navigation/mainStack/MainStack';
import Chibi from './Chibi';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('screen');

const chibi = [
  {
    imageOne: require('../../assets/images/onboarding/chibi.1.png'),
    imageTwo: require('../..//assets/images/onboarding/chibi.2.png'),
  },
  {
    imageOne: require('../../assets/images/onboarding/chibi.3.png'),
    imageTwo: require('../../assets/images/onboarding/chibi.4.png'),
  },
  {
    imageOne: require('../../assets/images/onboarding/chibi.5.png'),
    imageTwo: require('../../assets/images/onboarding/chibi.6.png'),
    // imageTwo: require('../../assets/images/onboarding/chibi.7.png'),
  },
];

interface Props {
  setOnboard: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OnboardingScreen({setOnboard}: Props) {
  const [index, setIndex] = useState(0);
  const prev = chibi[index - 1];
  const next = chibi[index + 1];

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const bStyle = useAnimatedStyle(() => {
    const x = interpolate(
      index,
      [0, 2],
      [-height * 1.77 + width, 0],
      Extrapolate.CLAMP,
    );
    return {
      transform: [
        {
          translateX: withTiming(x, {
            duration: 1000,
          }),
        },
      ],
    };
  }, [index]);

  const cStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateX: withTiming(index * -width * 2, {
            duration: 650,
          }),
        },
      ],
    }),
    [index],
  );

  const t1Style = useAnimatedStyle(() => {
    const opacity = interpolate(index, [0, 1, 2], [1, 0, 0]);
    return {
      opacity: withTiming(opacity, {duration: 350}),
    };
  }, [index]);

  const t2Style = useAnimatedStyle(() => {
    const opacity = interpolate(index, [0, 1, 2], [0, 1, 0]);
    return {
      opacity: withTiming(opacity, {duration: 350}),
    };
  }, [index]);

  const t3Style = useAnimatedStyle(() => {
    const opacity = interpolate(index, [0, 1, 2], [0, 0, 1]);
    return {
      opacity: withTiming(opacity, {duration: 350}),
    };
  }, [index]);

  const onGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: (_, ctx) => {},
      onActive: (event, ctx) => {},
      onEnd: event => {
        if (event.velocityX < 0) {
          next && runOnJS(setIndex)(index + 1);
        } else {
          prev && runOnJS(setIndex)(index - 1);
        }
      },
    });

  return (
    <View style={{flex: 1, justifyContent: 'flex-start'}}>
      <Animated.Image
        source={require('../../assets/images/onboarding/background.2.jpg')}
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            height,
            width: undefined,
            aspectRatio: 16 / 9,
            // transform: [{translateX: -height * 1.77 + width}],
          },
          bStyle,
        ]}
      />
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            {
              height: (height / 3) * 2,
              width: width * 6,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            },
            cStyle,
          ]}>
          {chibi.map((item, i) => (
            <Chibi key={i} item={item} />
          ))}
        </Animated.View>
      </PanGestureHandler>
      <ImageBackground
        source={require('../../assets/images/onboarding/bubble.3.png')}
        resizeMode="stretch"
        style={{
          width: width,
          height: height / 3,
          justifyContent: 'flex-start',
          paddingTop: '15%',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
          left: 0,
          zIndex: 10,
        }}>
        <View style={{height: '65%', width: '80%'}}>
          <Animated.View
            style={[
              {position: 'absolute', alignSelf: 'center', bottom: '60%'},
              t1Style,
            ]}>
            <CustomText bold style={{fontSize: 22}}>
              "<CustomText style={{color: '#03A9F4'}}> Developers </CustomText>{' '}
              Assemble"
            </CustomText>
          </Animated.View>
          <Animated.View
            style={[
              {position: 'absolute', alignSelf: 'center', bottom: '60%'},
              t2Style,
            ]}>
            <CustomText bold style={{fontSize: 22}}>
              "With great power comes great
              <CustomText style={{color: '#FF5722'}}> Animations </CustomText>"
            </CustomText>
          </Animated.View>
          <Animated.View
            style={[
              {position: 'absolute', alignSelf: 'center', bottom: '60%'},
              t3Style,
            ]}>
            <CustomText bold style={{fontSize: 22}}>
              "<CustomText style={{color: '#78909C'}}> iOS </CustomText> and
              <CustomText style={{color: '#8BC34A'}}> Android </CustomText>
              together at last"
            </CustomText>
          </Animated.View>
          {prev && (
            <Pressable
              onPress={() => setIndex(index - 1)}
              style={{position: 'absolute', bottom: 0, left: 0}}>
              <Icon name="ios-play-back-sharp" size={30} color="#263238" />
            </Pressable>
          )}
          {next ? (
            <Pressable
              onPress={() => setIndex(index + 1)}
              style={{position: 'absolute', bottom: 0, right: 0}}>
              <Icon name="ios-play-forward-sharp" size={30} color="#263238" />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                setOnboard(false);
                // navigation.navigate('Drawer');
              }}
              style={{position: 'absolute', bottom: 0, right: 0}}>
              <Icon name="home" size={30} color="#263238" />
            </Pressable>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({});
