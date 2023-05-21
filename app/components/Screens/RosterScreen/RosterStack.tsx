import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { View } from 'react-native';


export function RosterStack() {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator initialRouteName="RosterApp">
        <Stack.Screen
          name="RosterApp"
          children={() => <View />}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }