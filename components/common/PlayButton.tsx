import { Image, TouchableOpacity, StyleProp, ViewStyle } from "react-native";

type Props = {
  onPress?: () => void;
  start: Boolean;
  style: StyleProp<ViewStyle>;
};

export const PlayButton = ({ onPress, start=false, style }: Props) => {
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
