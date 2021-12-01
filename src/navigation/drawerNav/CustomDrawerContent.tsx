import React from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {StyleSheet, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function DrawerContent({props}: any) {
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView {...props}>
      <SafeAreaView style={styles.safe}>
        <DrawerItem
          label="Home"
          labelStyle={styles.label}
          onPress={() => navigation.navigate('Home')}
        />
        <DrawerItem
          label="Comics"
          labelStyle={styles.label}
          onPress={() => navigation.navigate('Comics')}
        />
      </SafeAreaView>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  safe: {
    marginTop: 20,
  },
  label: {
    color: 'white',
    fontWeight: '500',
    fontSize: 20,
  },
});
