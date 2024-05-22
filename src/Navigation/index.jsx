import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Chat,
  ForgotPassword,
  Profile,
  Signin,
  Signup,
  SplashScreen,
} from '../Screens';
import {Icons, colors} from '../Theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function AppRootRouter() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: '#fff'},
        cardStyle: {backgroundColor: '#fff'},
      }}>
      <Stack.Screen name="Sign-in" component={Signin} />
      <Stack.Screen name="Sign-up" component={Signup} />
      <Stack.Screen name="Forgot-password" component={ForgotPassword} />
      <Stack.Screen name="Splash-screen" component={SplashScreen} />
      <Stack.Screen name="Main" component={BottomNavigation} />
    </Stack.Navigator>
  );
}

function BottomNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: null,
          tabBarIcon: ({focused}) => {
            return (
              <Icons.Entypo
                name="chat"
                size={26}
                color={focused ? colors.gray_bg_light : colors.gray}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: null,
          tabBarIcon: ({focused}) => {
            return (
              <Icons.Feather
                name="user"
                size={26}
                color={focused ? colors.gray_bg_light : colors.gray}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
