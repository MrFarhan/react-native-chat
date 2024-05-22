import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Chat, Profile} from '../Screens';

const Tab = createBottomTabNavigator();

export default function AppRootRouter() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
