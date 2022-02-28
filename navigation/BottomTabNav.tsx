import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import FeatherIcons from "react-native-vector-icons/Feather";
import FoundationIcons from "react-native-vector-icons/Foundation";
import IonIcons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../styles";
import { HomeScreen } from "../views/home/HomeScreen";
import { LogsScreen } from "../views/logs/LogsScreen";
import { ProfileScreen } from "../views/profile/ProfileScreen";
import { SoundsScreen } from "../views/sound/SoundsScreen";
import { TrackerScreen } from "../views/tracker/TrackerScreen";

const Tab = createBottomTabNavigator();

const DarkTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.white,
    background: Colors.primaryPurple,
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
            padding: 10,
            paddingTop: 18,
          },
          tabBarStyle: {
            backgroundColor: Colors.primaryPurple,
            borderTopWidth: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginTop: -20,
            height: 80,
            padding: 10,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FeatherIcons name="home" color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name="Sounds"
          component={SoundsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FoundationIcons name="sound" color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name="Log"
          component={LogsScreen}
          options={{
            tabBarIcon: () => (
              <View style={styles.logbtn}>
                <FeatherIcons name="plus" color={Colors.white} size={32} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Tracker"
          component={TrackerScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <IonIcons name="ios-stats-chart" color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name="Me"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account-circle-outline"
                color={color}
                size={20}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  logbtn: {
    marginTop: -40,
    borderRadius: 50,
    zIndex: 1,
    height: 65,
    width: 65,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondaryPurple,
  },
});
