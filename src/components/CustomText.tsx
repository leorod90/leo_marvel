import React from 'react';
import {Text} from 'react-native';
import Colors from '../constants/Colors';

interface Props {
  bold?: boolean;
  style?: any;
  adjustsFontSizeToFit?: boolean;
  numberOfLines?: number;
  children: React.ReactNode;
}

export default function CustomText({
  bold,
  style,
  adjustsFontSizeToFit,
  children,
  numberOfLines,
}: Props) {
  return (
    <Text
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      numberOfLines={numberOfLines}
      style={[
        {
          fontFamily: bold ? 'Roboto-Bold' : 'Roboto-Regular',
          color: Colors.black,
        },
        style,
      ]}>
      {children}
    </Text>
  );
}
