import * as React from 'react';
import {Image, Animated as RNAnimated, View, StyleSheet} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import Colors from '../../../constants/Colors';
import Styles from '../../../constants/Styles';
import Content from './Content';

const IMAGE_WIDTH = Styles.WIDTH * 0.8;
const IMAGE_HEIGHT = Styles.HEIGHT * 0.525;
const BG_WIDTH = IMAGE_WIDTH + Styles.bigPadding;
const BG_HEIGHT = Styles.HEIGHT * 0.725;

interface Props {
  comics: any;
}

export default ({comics}: Props) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const scrollX = React.useRef(new RNAnimated.Value(0)).current;
  const progress = RNAnimated.modulo(
    RNAnimated.divide(scrollX, Styles.WIDTH),
    Styles.WIDTH,
  );
  const onViewRef = React.useRef((viewableItems: any) => {
    setCurrentIndex(viewableItems.changed[0].index);
    // Use viewable items in state or as intended
  });
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: IMAGE_HEIGHT * 1.45,
        }}>
        <RNAnimated.FlatList
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
          data={comics}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          // snapToInterval={Styles.WIDTH}
          // decelerationRate='normal'
          onScroll={RNAnimated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
          bounces={false}
          style={{flexGrow: 0, zIndex: 999}}
          contentContainerStyle={{
            height: IMAGE_HEIGHT + Styles.bigPadding,
            paddingHorizontal: Styles.bigPadding * 2,
          }}
          renderItem={({item, index}) => {
            const inputRange = [
              (index - 1) * Styles.WIDTH,
              index * Styles.WIDTH,
              (index + 1) * Styles.WIDTH,
            ];
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0],
            });
            const translateY = scrollX.interpolate({
              inputRange,
              outputRange: [50, 0, 20],
            });
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.7, 1, 0.7],
            });
            return (
              <RNAnimated.View
                style={{
                  width: Styles.WIDTH,
                  paddingVertical: Styles.smallPadding,
                  opacity,
                  transform: [{translateY}, {scale}],
                }}>
                <SharedElement id={item.title}>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      backgroundColor: Colors.gray,
                      width: IMAGE_WIDTH,
                      height: IMAGE_HEIGHT,
                      resizeMode: 'stretch',
                      borderWidth: 3,
                      borderColor: Colors.black,
                    }}
                  />
                </SharedElement>
              </RNAnimated.View>
            );
          }}
        />
        <View
          style={{
            width: IMAGE_WIDTH,
            alignItems: 'center',
            marginLeft: Styles.bigPadding * 2,
            zIndex: 99,
          }}>
          {comics.map((item: any, index: number) => {
            const inputRange = [
              (index - 0.2) * Styles.WIDTH,
              index * Styles.WIDTH,
              (index + 0.2) * Styles.WIDTH,
            ];
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0],
            });
            const rotateY = scrollX.interpolate({
              inputRange,
              outputRange: ['45deg', '0deg', '45deg'],
            });
            return (
              <RNAnimated.View
                key={item.id}
                style={{
                  position: 'absolute',
                  height: Styles.HEIGHT / 5.5,
                  width: Styles.WIDTH * 0.8,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  opacity,
                  transform: [{perspective: IMAGE_WIDTH * 4}, {rotateY}],
                }}>
                <Content title={item.title} item={comics[currentIndex]} />
              </RNAnimated.View>
            );
          })}
        </View>
        <RNAnimated.View
          style={{
            width: BG_WIDTH,
            height: BG_HEIGHT,
            position: 'absolute',
            backgroundColor: 'white',
            borderWidth: 3,
            backfaceVisibility: 'visible',
            zIndex: 10,
            top: Styles.bigPadding,
            left: Styles.smallPadding * 3,
            bottom: 0,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 24,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            transform: [
              {
                perspective: IMAGE_WIDTH * 4,
              },
              {
                rotateY: progress.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ['0deg', '90deg', '180deg'],
                }),
              },
            ],
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
