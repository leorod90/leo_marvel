import 'react-native-gesture-handler';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';
import Store from './src/redux';
import OnboardingScreen from './src/screens/OnboardingScreen/OnboardingScreen';
import DrawerNav from './src/navigation/drawerNav/DrawerNav';
enableScreens();

export default function App() {
  const [onboard, setOnboard] = React.useState(true);
  return (
    <Provider store={Store}>
      <NavigationContainer theme={DarkTheme}>
        <GestureHandlerRootView style={{flex: 1}}>
          {onboard ? (
            <OnboardingScreen setOnboard={setOnboard} />
          ) : (
            <DrawerNav />
          )}
        </GestureHandlerRootView>
      </NavigationContainer>
    </Provider>
  );
}
