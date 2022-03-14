import { StyleSheet, StyleProp, TextStyle, View, Text, Pressable } from "react-native";
import { Colors, FontVariants } from "../../styles";
import React from "react";

type TabProps = {
  id: any,
  icon: any,
  text: String,
  longPressCallback: any,
  opac: number
};

export const FeaturedTabWrapper = ({ id, icon, text, longPressCallback, opac }: TabProps) => {
  return (
    <Pressable
      onLongPress={longPressCallback}
    >
      <View style={[styles.container,{opacity:opac}]}>
        {icon}
        <Text style={styles.text}>{text}</Text>
      </View>
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
    padding: 15
  },
  text: {
    ...FontVariants.headerThin,
    color: Colors.white,
  },
});
