import React from 'react';
import {SafeAreaView} from 'react-native';
import CustomText from './CustomText';
import LottieView from 'lottie-react-native';

export default function LottieLoading() {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <LottieView
        style={{height: 200}}
        source={require('../assets/json/loading.1.json')}
        autoPlay
        loop
      />
      <CustomText>Loading...</CustomText>
    </SafeAreaView>
  );
}
