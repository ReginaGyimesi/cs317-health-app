import React from "react";
import { Text, ImageBackground, StyleSheet } from "react-native";
import { ScreenWrapper } from "../../components/common/ScreenWrapper.tsx";
import { Clock } from "../../components/logs/Clock";

export const LogsScreen = () => {
  return (
    <ScreenWrapper title="Sleep logging" text="Start logging your sleep.">
      <Clock />
      <ImageBackground
        source={require("../../assets/images/semicircle.png")}
        style={styles.imgcontainer}
      >
      </ImageBackground>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  imgcontainer: {
    height: "100%",
    width: "100%",
    margin: 0
  },
});