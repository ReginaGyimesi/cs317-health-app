import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../views/home/HomeScreen";
import { SoundScreen } from "../views/sound/SoundScreen";
import { TrackerScreen } from "../views/tracker/TrackerScreen";

const Tab = createBottomTabNavigator();

export const Navigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: true,
        }}
      >
        <Tab.Screen name="home" component={HomeScreen} />
        <Tab.Screen name="sounds" component={SoundScreen} />
        <Tab.Screen name="tracker" component={TrackerScreen} />
        <Tab.Screen name="settings" component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
