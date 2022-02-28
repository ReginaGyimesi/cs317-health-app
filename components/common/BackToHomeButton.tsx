import { Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const BackToHomeButton = () => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate("Home")}>
      <Image source={require("../../assets/icons/back.png")} />
    </Pressable>
  );
};
