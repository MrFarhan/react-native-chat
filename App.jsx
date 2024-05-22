import React from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import AppRootRouter from './src/Navigation';
import Toast from 'react-native-toast-message';

function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="rgb(50,50,50)" />
      <AppRootRouter />
      <Toast visibilityTime={4000} topOffset={60} />
    </NavigationContainer>
  );
}

export default App;
