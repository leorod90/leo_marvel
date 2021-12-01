import React from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import CustomText from './CustomText';
import LottieView from 'lottie-react-native';
import Colors from '../constants/Colors';

interface Props {
  onPress: () => void;
}

export default function LottieError({onPress}: Props) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.offWhite,
      }}>
      <LottieView
        style={{height: 200}}
        source={require('../assets/json/error.json')}
        autoPlay
        loop
      />
      <CustomText style={{color: Colors.red, fontSize: 32}}>Error!</CustomText>
      <View
        style={{
          borderBottomColor: Colors.red,
          borderBottomWidth: 3,
          width: 48,
        }}
      />
      <CustomText style={{color: Colors.gray, marginVertical: 15}}>
        something went wrong
      </CustomText>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: Colors.red,
          paddingVertical: 10,
          paddingHorizontal: 25,
          borderRadius: 10,
        }}>
        <CustomText style={{color: Colors.offWhite}}>TRY AGAIN</CustomText>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
