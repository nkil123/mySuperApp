import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Browse from '../screens/Browse';

export type BottomTabStackParamList = {
  Home: undefined;
  Browse: undefined;
  Profile: { userId: string };
};

const Tab = createBottomTabNavigator<BottomTabStackParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Browse" component={Browse} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
