import {
  StyleSheet,
  StyleProp,
  TextStyle,
  View,
  Text,
  Pressable,
} from "react-native";
import { Colors, FontVariants } from "../../styles";
import React from "react";
import * as Animatable from "react-native-animatable";

type TabProps = {
  icon?: any;
  text: String;
  longPressCallback?: any;
  pressOutCallback?: any;
  op?: any;
  pressed?: boolean;
};

export const FeaturedTabWrapper = ({
  icon,
  text,
  longPressCallback,
  pressOutCallback,
  op,
  pressed = false,
}: TabProps) => {
  return (
    <Pressable onLongPress={longPressCallback} onPressOut={pressOutCallback}>
      <Animatable.View
        animation={pressed && "shake"}
        style={[styles.container, { opacity: op }]}
      >
        {icon}
        <Text style={styles.text}>{text}</Text>
      </Animatable.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    marginRight: 30,
    marginLeft: 30,
    marginBottom: 10,
    justifyContent: "space-between",
    backgroundColor: Colors.grey60,
    flexDirection: "row",
    padding: 15,
  },
  text: {
    ...FontVariants.headerThin,
    color: Colors.white,
  },
});
