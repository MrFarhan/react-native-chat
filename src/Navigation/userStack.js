import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Chat, Profile} from '../Screens';
import {Icons, colors} from '../Theme';
import ChatScreen from '../Screens/Chat/ChatScreen';
import {useAuth} from '../hooks/useAuth';
import {NavigationContainer} from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function UserStack() {
  const {user} = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {backgroundColor: '#fff'},
          cardStyle: {backgroundColor: '#fff'},
        }}>
        <Stack.Screen name="Main" component={BottomNavigation} />
        <Stack.Screen name="chat-screen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
