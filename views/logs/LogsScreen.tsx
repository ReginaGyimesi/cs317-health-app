import React from "react";
import { Text, ImageBackground, StyleSheet, Image, View } from "react-native";
import { ScreenWrapper } from "../../components/common/ScreenWrapper.tsx";
import { Clock } from "../../components/logs/Clock";

export const LogsScreen = () => {
  return (
    <ScreenWrapper title="Sleep logging" text="Start logging your sleep.">
      {/* <Clock /> */}
      <View style={styles.capsule}>
        <Text>alarm</Text>
        <Text>07:00</Text>
        <Text>time to sleep</Text>
        <Text>08:00</Text>
      </View>
      <Image
        source={require("../../assets/images/semicircle.png")}
        style={styles.imgcontainer}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  imgcontainer: {
    width: "100%",
  },
  capsule: {
    flexDirection: "row",
  },
});
