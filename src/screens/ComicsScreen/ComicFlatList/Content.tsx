import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Pressable} from 'react-native';
import CustomText from '../../../components/CustomText';
import Colors from '../../../constants/Colors';

interface Props {
  item: any;
  title: string;
}

export default function Content({item, title}: Props) {
  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <>
      <CustomText
        style={{
          textAlign: 'center',
          fontWeight: '800',
          fontSize: 22,
          color: Colors.black,
          textTransform: 'uppercase',
        }}
        numberOfLines={3}
        adjustsFontSizeToFit>
        {title}
      </CustomText>
      <Pressable
        style={{flexDirection: 'row'}}
        onPress={() => navigation.push('DetailsScreen', {item})}>
        <CustomText
          style={{
            fontSize: 16,
            backgroundColor: Colors.egg,
            padding: 10,
            borderWidth: 2,
            borderRadius: 5,
            color: Colors.gray,
          }}>
          More Info
        </CustomText>
      </Pressable>
    </>
  );
}
