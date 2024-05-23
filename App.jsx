import React, {useEffect} from 'react';
import {Platform, StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import AppRootRouter from './src/Navigation';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';

function App() {
  useEffect(() => {
    const ac = new AbortController();

    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);

    return function cleanup() {
      ac.abort();
    };
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="rgb(50,50,50)" />
      <AppRootRouter />
      <Toast visibilityTime={4000} topOffset={60} />
    </NavigationContainer>
  );
}

export default App;
