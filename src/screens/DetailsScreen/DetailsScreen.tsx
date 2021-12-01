import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Pressable,
  Linking,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import CustomText from '../../components/CustomText';
import Styles from '../../constants/Styles';
import {ComicStackNavProps} from '../../navigation/comicStack/ComicStack';
import Icon from 'react-native-vector-icons/Ionicons';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Colors from '../../constants/Colors';

export default function DetailsScreen({
  route,
  navigation,
}: ComicStackNavProps<'DetailsScreen'>) {
  const {item} = route.params;
  const {title, description, image, releaseDate, comics, link} = item;

  let date = new Date(releaseDate);
  let formatDate =
    date.getMonth() + 1 + '-' + date.getDate() + '-' + date.getFullYear(); //prints expected format.
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          zIndex: 10,
          left: Styles.smallPadding,
          position: 'absolute',
        }}>
        <View
          style={{
            height: getStatusBarHeight(false),
            width: '100%',
          }}
        />
        <View
          style={{
            backgroundColor: Colors.offWhite,
            padding: 2.5,
            borderRadius: 50,
          }}>
          <Icon
            name="arrow-back"
            size={30}
            color={Colors.red}
            style={{alignSelf: 'flex-start'}}
            onPress={navigation.goBack}
          />
        </View>
      </View>
      <ScrollView style={styles.container} bounces={false}>
        <SharedElement id={title}>
          <Image
            source={{uri: image}}
            style={[
              {
                width: Styles.WIDTH,
                height: Styles.WIDTH * 1.5,
                resizeMode: 'stretch',
              },
            ]}
          />
        </SharedElement>
        <View style={styles.details}>
          <CustomText style={styles.title} bold>
            {title}
          </CustomText>
          {comics ? (
            <CustomText style={{color: Colors.gray}}>
              Comics Available: {comics}
            </CustomText>
          ) : (
            <CustomText style={{color: Colors.gray}}>
              Release Date: {formatDate}
            </CustomText>
          )}
          {description ? (
            <CustomText style={styles.description}>{description}</CustomText>
          ) : (
            <CustomText style={[styles.description, {color: Colors.gray}]}>
              [ No Description Found ]
            </CustomText>
          )}
        </View>
        <View
          style={{
            borderBottomColor: '#BDBDBD',
            borderBottomWidth: 1,
          }}
        />
        <SafeAreaView style={styles.footer}>
          <View style={styles.footer}>
            <Pressable onPress={() => Linking.openURL(link)}>
              <CustomText style={styles.website}>Visit Website</CustomText>
            </Pressable>
            <CustomText style={styles.data}>
              Data provided by Marvel {'\u00A9'} 2021 MARVEL
            </CustomText>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: Colors.offWhite,
  },
  details: {
    padding: Styles.bigPadding,
    backgroundColor: Colors.offWhite,
  },
  title: {
    fontSize: 24,
    marginVertical: Styles.smallPadding,
  },
  description: {
    fontSize: 18,
    marginVertical: Styles.smallPadding,
    lineHeight: 20,
  },
  footer: {
    padding: Styles.smallPadding * 2,
    backgroundColor: Colors.txtInput,
  },
  website: {
    fontSize: 16,
    backgroundColor: Colors.egg,
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    color: Colors.gray,
    alignSelf: 'flex-start',
  },
  data: {
    fontSize: 16,
    marginTop: Styles.smallPadding,
    color: Colors.gray,
  },
});
