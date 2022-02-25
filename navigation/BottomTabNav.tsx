import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "../views/home/HomeScreen";

const Tab = createBottomTabNavigator();

export const Navigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
        }}
      >
        <Tab.Screen name="home" component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
