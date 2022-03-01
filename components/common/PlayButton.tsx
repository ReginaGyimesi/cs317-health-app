import { Image, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { useState } from "react";

type Props = {
  onPress?: () => void;
  style: StyleProp<ViewStyle>;
};

export const PlayButton = ({ onPress, style }: Props) => {
  const [start, setStart] = useState(true);

  return (
    <TouchableOpacity
      onPress={() => {
        setStart(!start);
        onPress;
      }}
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
