import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import CustomText from '../../components/CustomText';

function useInterval(callback, delay) {
  const savedCallback = useRef();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function FirstRender() {
  const [toggle, setToggle] = useState(true);
  const [count, setCount] = useState(0);

  useInterval(() => {
    // Your custom logic here
    setToggle(current => !current);
  }, 1200);

  const rotate = useDerivedValue(
    () =>
      toggle
        ? withTiming(10, {duration: 1000})
        : withTiming(-10, {duration: 1000}),
    [toggle],
  );

  const aStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotate.value}deg`}],
    };
  });

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Animated.Image
        style={[{marginBottom: 20, height: 200, width: 200}, aStyle]}
        source={require('../../assets/images/onboarding/chibi.0.png')}
      />
      <CustomText style={{fontSize: 20}}>Start Searching!</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({});
