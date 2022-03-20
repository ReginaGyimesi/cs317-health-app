import { TouchableOpacity, StyleProp, ViewStyle, View } from "react-native";
import React from "react";
import { Colors } from "../../styles/Colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

type Props = {
  onPress?: () => void;
  start: Boolean;
  style: StyleProp<ViewStyle>;
};

export const PlayButton = ({ onPress, start = false, style }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Animatable.View
        style={styles.logbtn}
        animation={!start && "pulse"}
        easing="ease-in-out"
        iterationCount="infinite"
        iterationDelay={1000}
      >
        <MaterialCommunityIcons
          name={start ? "play" : "pause"}
          color={Colors.grey20}
          size={70}
        />
      </Animatable.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logbtn: {
    borderRadius: 50,
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondaryPurple,
  },
});
