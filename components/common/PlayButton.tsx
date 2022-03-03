import { Image, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { useState } from "react";

type Props = {
  onPress?: () => void;
  start: Boolean;
  style: StyleProp<ViewStyle>;
};

export const PlayButton = ({ onPress, start, style }: Props) => {
  return (
    <TouchableOpacity
      onPress={
        onPress
      }
      style={style}
    >
      {start ? (
        <Image source={require("../../assets/images/play.png")} />
      ) : (
        <Image source={require("../../assets/images/stop.png")} />
      )}
    </TouchableOpacity>
  );
};
