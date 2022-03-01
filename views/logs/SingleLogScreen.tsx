import React from "react";
import { ScreenWrapper } from "../../components/common/ScreenWrapper.tsx";
import { Text, StyleSheet } from "react-native";
import { LogsTabWrapper } from "../../components/logs/LogsTabWrapper";
import { Colors } from "../../styles";

export const SingleLogScreenNavName = "SingleLog";
export const SingleLogScreen = () => {
  const logs = [
    { title: "Deep sleep", text: "04:35", bg: Colors.opPurple },
    { title: "Light sleep", text: "02:22", bg: Colors.opGreen },
    { title: "Awake", text: "00:03", bg: Colors.opPink },
    { title: "Time in bed", text: "07:00", bg: "transparent" },
  ];
  return (
    <ScreenWrapper
      title="Good morning"
      text="Let's see how well you slept last night."
    >
      {logs.map((log, idx) => (
        <LogsTabWrapper
          key={idx}
          title={log.title}
          text={log.text}
          style={[styles.margin, { backgroundColor: log.bg }]}
        />
      ))}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  margin: { marginTop: 20 },
});
