import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Chat, Profile} from '../Screens';
import {Icons, colors} from '../Theme';

const Tab = createBottomTabNavigator();

export default function AppRootRouter() {
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
