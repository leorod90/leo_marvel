import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, Image, Animated, Pressable} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import CustomText from '../../../components/CustomText';
import Colors from '../../../constants/Colors';
import Styles from '../../../constants/Styles';
import DelayAnimations from './DelayAnimations';

interface Props {
  charactersResult: any;
}

const ITEM_HEIGHT = 100;
const ITEM_CONTAINER = ITEM_HEIGHT + Styles.smallPadding;

export default function CharacterFlatList({charactersResult}: Props) {
  const navigation = useNavigation();
  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <Animated.FlatList
      data={charactersResult}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
        useNativeDriver: true,
      })}
      renderItem={({item, index}) => {
        const scaleRange = [
          -1,
          0,
          ITEM_CONTAINER * index,
          ITEM_CONTAINER * (index + 2),
        ];

        const opacityRange = [
          -1,
          0,
          ITEM_CONTAINER * index,
          ITEM_CONTAINER * (index + 1),
        ];

        const scale = scrollY.interpolate({
          inputRange: scaleRange,
          outputRange: [1, 1, 1, 0],
        });

        const opacity = scrollY.interpolate({
          inputRange: opacityRange,
          outputRange: [1, 1, 1, 0],
        });

        return (
          <DelayAnimations delay={index * 50}>
            <Pressable onPress={() => navigation.push('DetailsScreen', {item})}>
              <Animated.View
                style={[styles.item, {opacity, transform: [{scale}]}]}>
                <SharedElement id={item.title} style={{width: '25%'}}>
                  <Image source={{uri: item.image}} style={styles.image} />
                </SharedElement>
                <View style={styles.info}>
                  <CustomText
                    bold
                    style={{fontSize: 22}}
                    numberOfLines={1}
                    adjustsFontSizeToFit>
                    {item.title}
                  </CustomText>
                  <CustomText style={{fontSize: 16, opacity: 0.7}}>
                    Comics Available: {item.comics}
                  </CustomText>
                </View>
              </Animated.View>
            </Pressable>
          </DelayAnimations>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginHorizontal: Styles.bigPadding,
    paddingBottom: Styles.bigPadding,
    paddingTop: Styles.headerHeight + Styles.alphaHeight,
  },
  item: {
    height: ITEM_HEIGHT,
    width: '100%',
    // borderWidth: 3,
    // borderColor: Colors.black,
    borderRadius: 5,
    flexDirection: 'row',
    marginBottom: Styles.smallPadding,
    backgroundColor: 'rgba(255,255,255, .85)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    height: '100%',
    width: '100%',
    borderWidth: 3,
    borderColor: Colors.black,
    resizeMode: 'stretch',
  },
  info: {
    padding: Styles.smallPadding,
    borderWidth: 3,
    borderLeftWidth: 0,
    borderColor: Colors.black,
    height: '100%',
    width: '75%',
  },
});
