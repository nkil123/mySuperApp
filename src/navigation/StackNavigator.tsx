import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import Details from '../screens/Details';

export type RootStackParamList = {
  BottomTabNavigator: undefined;
  Home: undefined;
  Profile: { userId: string };
  Details: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigatior = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BottomTabNavigator">
        <Stack.Screen
          component={BottomTabNavigator}
          name="BottomTabNavigator"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={Details}
          name="Details"
          options={{
            headerTitle: 'Welcome to Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigatior;
