import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import React from "react";
import { Text, View, Button, Switch } from 'react-native';
import { Navigator } from "./navigation/BottomTabNav";
import 'react-native-gesture-handler';
import { RootSiblingParent } from 'react-native-root-siblings';
import Modal from "react-native-modal";
import triggerAlarms from "./utils/alarmHandler";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
  });

  const test = async() => {
    setInterval(() => {
      let isAlarmTime = triggerAlarms();
      if(isAlarmTime){
        return (
          <View>
            <Modal>
              <View style={{ flex: 1 }}>
                <Text>I am the modal content!</Text>
              </View>
            </Modal>
          </View>
        );
      }
    },
      60000);
  }

  test();

  if (!fontsLoaded) {
    return (
      <RootSiblingParent>
        <AppLoading />
      </RootSiblingParent>
    );
  } else {
    return (
      <RootSiblingParent>
        <Navigator />
      </RootSiblingParent>
    );
  }
}
