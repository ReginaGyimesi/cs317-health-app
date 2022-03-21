import React from "react";
import { ScreenWrapper } from "../../components/common/ScreenWrapper.tsx";
import { Text, StyleSheet } from "react-native";
import { LogsTabWrapper } from "../../components/logs/LogsTabWrapper";
import { Colors } from "../../styles";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { millisToTime } from "../../utils/millisToTime"

export const SingleLogScreenNavName = "SingleLog";
export const SingleLogScreen = () => {
  const [lastLogged, setLastLogged] = useState(Object)
  const getItem = async () => {
    let logged = await AsyncStorage.getItem("loggedHours");
    let data = JSON.parse(logged);
    setLastLogged(data.slice(-1)[0]);
    return data;
  };

  let arr = Object.values(lastLogged)
  const logs = [
    { title: "Deep sleep", text: millisToTime(arr[2]), bg: Colors.opPurple },
    { title: "Light sleep", text: millisToTime(arr[1]), bg: Colors.opGreen },
    // { title: "Awake", text: "00:03", bg: Colors.opPink },
    { title: "Time in bed", text: millisToTime(arr[0]), bg: "transparent" },
  ];

  useEffect(() => {
    getItem()
  }, [])

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
