import React from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import AppRootRouter from './src/Navigation';

function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="rgb(50,50,50)" />
      <AppRootRouter />
    </NavigationContainer>
  );
}

export default App;
