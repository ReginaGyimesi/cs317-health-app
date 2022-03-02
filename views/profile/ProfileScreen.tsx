import React from "react";
import { Text, View } from "react-native";
import { ScreenWrapper } from "../../components/common/ScreenWrapper.tsx";

export const ProfileScreenNavName = "Me";
export const ProfileScreen = () => {
  return (
    <ScreenWrapper
      title="Hello, Bob"
      text=""
    >
      <Text>test profile</Text>
    </ScreenWrapper>
  );
};
