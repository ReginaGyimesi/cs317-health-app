import { Image, TouchableOpacity } from "react-native";
import { useState } from "react";

type Props = {
  onPress?: () => void;
};

export const PlayButton = ({ onPress, ...props }: Props) => {
  const [start, setStart] = useState(true);

  return (
    <TouchableOpacity
      onPress={() => {
        setStart(!start);
        onPress;
      }}
      {...props}
    >
      {start ? (
        <Image source={require("../../assets/images/play.png")} />
      ) : (
        <Image source={require("../../assets/images/stop.png")} />
      )}
    </TouchableOpacity>
  );
};
