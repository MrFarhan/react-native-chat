import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Chat, ForgotPassword, Profile, Signin, Signup, Users} from '../Screens';
import ChatScreen from '../Screens/Chat/ChatScreen';
import {Icons, colors} from '../Theme';
import {useAuth} from '../hooks/useAuth';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function AppRootRouter() {
  const {user} = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: '#fff'},
        cardStyle: {backgroundColor: '#fff'},
      }}>
      {!user ? (
        <>
          <Stack.Screen name="Sign-in" component={Signin} />
          <Stack.Screen name="Sign-up" component={Signup} />
          <Stack.Screen name="Forgot-password" component={ForgotPassword} />
        </>
      ) : (
        <>
          <Stack.Screen name="Main" component={BottomNavigation} />
          <Stack.Screen name="chat-screen" component={ChatScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
      }}>
      <Tab.Screen
        name="Users"
        component={Users}
        options={{
          headerShown: null,
          tabBarIcon: ({focused}) => {
            return (
              <Icons.FontAwesome
                name="users"
                size={26}
                color={focused ? colors.primary : colors.gray}
              />
            );
          },
        }}
      />
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
                color={focused ? colors.primary : colors.gray}
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
                color={focused ? colors.primary : colors.gray}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
