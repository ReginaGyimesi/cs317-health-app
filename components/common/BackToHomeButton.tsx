import { Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavName } from "../../views";
import React from "react";

export const BackToHomeButton = () => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate({key: HomeScreenNavName})}>
      <Image source={require("../../assets/icons/back.png")} />
    </Pressable>
  );
};
