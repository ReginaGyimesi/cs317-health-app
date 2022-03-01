import React from "react";
import { ScreenWrapper } from "../../components/common/ScreenWrapper.tsx";
import { Text } from "react-native";

export const TrackerScreen = () => {
  return (
    <ScreenWrapper title="Sleep tracker" text="All your sleep sessions.">
      <Text>children</Text>
    </ScreenWrapper>
  );
};
