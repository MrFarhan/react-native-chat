import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import AppRootRouter from './src/Navigation';

function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 300);
  });
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="rgb(50,50,50)" />
      <AppRootRouter />
      <Toast visibilityTime={4000} topOffset={60} />
    </NavigationContainer>
  );
}

export default App;
