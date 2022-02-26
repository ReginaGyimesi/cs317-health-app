import * as React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../views/home/HomeScreen";
import { SoundScreen } from "../views/sound/SoundScreen";
import { TrackerScreen } from "../views/tracker/TrackerScreen";
import { SettingsScreen } from "../views/settings/SettingsScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const DarkTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FFF',
    background: '#0f315b',
  },
};

export const Navigator = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false, 
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            padding: 10
          },
          tabBarStyle: {
            backgroundColor: '#0e142f',
            borderTopWidth: 0,
            height: 70,
            padding: 10
          },
        }}
      >
        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size}/>
            ),
          }}
        />
        <Tab.Screen
          name="sounds"
          component={SoundScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="music" color={color} size={size}/>
            ),
          }}
        />
        <Tab.Screen
          name="tracker"
          component={TrackerScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="clock" color={color} size={size}/>
            ),
          }}
        />
        <Tab.Screen
          name="settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog" color={color} size={size}/>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
