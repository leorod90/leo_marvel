import React from 'react';
import {StyleSheet, View, FlatList, Pressable} from 'react-native';
import CustomText from '../../components/CustomText';
import Colors from '../../constants/Colors';
import Styles from '../../constants/Styles';
import alphabet from './alphabet';

interface Props {
  active: string;
  getCharacter: () => void;
}

export default function AlphaFlatList({active, getCharacter}: Props) {
  return (
    <View
      style={{
        position: 'absolute',
        top: Styles.headerHeight,
        left: 0,
        height: Styles.alphaHeight,
        backgroundColor: 'rgba(255,255,255,.9)',
        zIndex: 20,
      }}>
      <FlatList
        data={alphabet}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: Styles.smallPadding}}
        keyExtractor={item => item}
        renderItem={({item, index}) => (
          <Pressable
            onPress={() => getCharacter(item)}
            style={{
              height: 50,
              width: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomText
              style={{
                fontSize: 20,
                color: item == active ? Colors.red : Colors.gray,
              }}>
              {item}
            </CustomText>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
