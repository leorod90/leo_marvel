import React from 'react';
import {StyleSheet, View} from 'react-native';
import CustomText from './CustomText';

export default function NoResults() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <CustomText>{'{{{ No Results }}}'}</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({});
