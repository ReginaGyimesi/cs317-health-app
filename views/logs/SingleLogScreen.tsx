import React from "react";
import { ScreenWrapper } from "../../components/common/ScreenWrapper.tsx";
import { Text } from "react-native";

export const SingleLogScreenNavName = "SingleLog";
export const SingleLogScreen = () => {
  return (
    <ScreenWrapper title="Good morning" text="Let's see how well you slept last night.">
      <Text>children</Text>
    </ScreenWrapper>
  );
};