import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ForgotPassword, Signin, Signup} from '../Screens';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: '#fff'},
          cardStyle: {backgroundColor: '#fff'},
        }}>
        <Stack.Screen name="Sign-in" component={Signin} />
        <Stack.Screen name="Sign-up" component={Signup} />
        <Stack.Screen name="Forgot-password" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
