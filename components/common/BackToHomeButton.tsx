import { Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavName } from "../../views";

export const BackToHomeButton = () => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate(HomeScreenNavName)}>
      <Image source={require("../../assets/icons/back.png")} />
    </Pressable>
  );
};
