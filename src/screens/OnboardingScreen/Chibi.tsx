import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';

const size = 180;

interface Props {
  item: any;
}

const {width, height} = Dimensions.get('screen');

export default function Chibi({item}: Props) {
  const {imageOne, imageTwo} = item;
  return (
    <View
      style={{
        height: '100%',
        width: width * 2,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={imageOne} style={{height: size, width: size}} />
        <Image source={imageTwo} style={{height: size, width: size}} />
      </View>
      <View style={{flex: 1}} />
    </View>
  );
}

const styles = StyleSheet.create({});
