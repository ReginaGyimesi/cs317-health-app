import { StyleSheet, ViewStyle, View, Text, StyleProp } from "react-native";
import { Colors, FontVariants } from "../../styles";
import React from "react";

type TabProps = {
  title: any;
  text: String;
  style: StyleProp<ViewStyle>;
};

export const LogsTabWrapper = ({ title, style, text }: TabProps) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
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
  title: {
    ...FontVariants.headerThin,
    color: Colors.white,
  },
  text: {
    ...FontVariants.headerBold,
    color: Colors.white,
  },
});
