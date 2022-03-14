import { StyleSheet, StyleProp, TextStyle, View, Text } from "react-native";
import { Colors, FontVariants } from "../../styles";
import React from "react";

type TabProps = {
  icon: any,
  text: String
};

export const FeaturedTabWrapper = ({ icon, text }: TabProps) => {
  return (
    <View style={[styles.container]}>
      {icon}
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
    padding: 15
  },
  text: {
    ...FontVariants.headerThin,
    color: Colors.white,
  },
});
