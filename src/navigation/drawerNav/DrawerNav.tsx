import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import {RouteProp} from '@react-navigation/native';
import SideDrawer from './SideDrawer';
import CustomDrawerContent from './CustomDrawerContent';
import {ImageBackground, View} from 'react-native';

type DrawerParamList = {
  SideDrawer: undefined;
};

export type DrawerNavProps<T extends keyof DrawerParamList> = {
  navigation: DrawerNavigationProp<DrawerParamList, T>;
  route: RouteProp<DrawerParamList, T>;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNav() {
  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../../assets/images/drawer/drawer.jpg')}
      resizeMode="stretch">
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,.5)'}}>
        <Drawer.Navigator
          backBehavior="none"
          screenOptions={{
            overlayColor: 'transparent',
            drawerStyle: {
              flex: 1,
              width: '40%',
              backgroundColor: 'transparent',
            },
            sceneContainerStyle: {
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,

              elevation: 24,
              backgroundColor: 'transparent',
            },
            drawerContentStyle: {
              backgroundColor: 'transparent',
            },
            headerShown: false,
            drawerType: 'slide',
          }}
          drawerContent={props => <CustomDrawerContent />}>
          <Drawer.Screen name="SideDrawer" component={SideDrawer} />
        </Drawer.Navigator>
      </View>
    </ImageBackground>
  );
}
