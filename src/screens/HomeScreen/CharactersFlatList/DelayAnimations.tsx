import React from 'react';
import {Animated} from 'react-native';

interface Props {
  delay: number;
  children: React.ReactNode;
}

export default function DelayAnimations({delay, children}: Props) {
  const startScale = 0;
  const endScale = 1;
  const speed = 800;

  const animValue = React.useRef(new Animated.Value(startScale)).current;
  React.useEffect(() => {
    const animation = () => {
      Animated.timing(animValue, {
        delay: delay,
        toValue: endScale,
        duration: speed,
        useNativeDriver: true,
      }).start();
    };
    animation();
  }, [animValue]);

  return (
    <Animated.View
      style={[
        {
          opacity: animValue,
          transform: [{scale: animValue}],
        },
      ]}>
      {children}
    </Animated.View>
  );
}
