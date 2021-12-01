import React from 'react';
import {useWindowDimensions, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Styles from '../constants/Styles';
import Colors from '../constants/Colors';
import CustomText from './CustomText';

interface Props {
  title?: string | null;
}

export default function CustomHeader({title}: Props) {
  const {height, width} = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        backgroundColor: 'rgba(255,255,255,.9)',
        zIndex: 20,
      }}>
      <View
        style={{
          height: getStatusBarHeight(true),
          width: '100%',
        }}
      />
      <View
        style={{
          paddingHorizontal: Styles.bigPadding,
          paddingVertical: Styles.smallPadding,
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          height: 50,
        }}>
        <Icon
          name="menu"
          size={30}
          color={Colors.red}
          onPress={navigation.openDrawer}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            paddingRight: 30,
          }}>
          <CustomText bold style={{fontSize: 18}}>
            {title ? title : 'Search'}
          </CustomText>
        </View>
      </View>
    </View>
  );
}
