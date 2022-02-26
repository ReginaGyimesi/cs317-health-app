import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../views/home/HomeScreen";
import { SoundScreen } from "../views/sound/SoundScreen";
import { TrackerScreen } from "../views/tracker/TrackerScreen";
import { SettingsScreen } from "../views/settings/SettingsScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export const Navigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: true,
          tabBarStyle: {
            backgroundColor: '#0e142f'
          }
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
