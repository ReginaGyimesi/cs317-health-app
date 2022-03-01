import React from "react";
import { Text, View } from "react-native";
import { ScreenWrapper } from "../../components/common/ScreenWrapper.tsx";

export const SoundsScreenNavName = "Sounds";
export const SoundsScreen = () => {
  return (
    <ScreenWrapper title="Sleep music" text="Ease the mind into a restful night's sleep with light nature sounds.">
      <Text>children</Text>
    </ScreenWrapper>
  );
};
