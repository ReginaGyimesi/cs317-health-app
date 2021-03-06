import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import {
  HomeScreen,
  AlarmScreen,
  HomeScreenNavName,
  AlarmScreenNavName,
  LogsScreen,
  LogScreenNavName,
  SingleLogScreen,
  SingleLogScreenNavName,
  LoginScreenNavName,
  LoginScreen,
} from "../views";

const Stack = createStackNavigator();

export const HomeToAlarmNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={HomeScreenNavName} component={HomeScreen} />
      <Stack.Screen name={AlarmScreenNavName} component={AlarmScreen} />
    </Stack.Navigator>
  );
};

export const LogToSingleLogNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={LogScreenNavName} component={LogsScreen} />
      <Stack.Screen name={SingleLogScreenNavName} component={SingleLogScreen} />
    </Stack.Navigator>
  );
};

export const LoginToHomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={LoginScreenNavName} component={LoginScreen} />
      <Stack.Screen name={HomeScreenNavName} component={HomeScreen} />
    </Stack.Navigator>
  );
};
