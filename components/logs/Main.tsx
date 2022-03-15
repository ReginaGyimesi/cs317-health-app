import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Colors, FontVariants } from "../../styles";
import { calcTimeToSleep, fetchNextAlarm } from "../../utils/alarmUtils";
import { Clock } from "./Clock";

export const Main = () => {
  // Set the initial alarms screen data
  const [nextAlarm, setNextAlarm] = useState(null);
  const [timeToSleep, setTimeToSleep] = useState(null);

  const fetchTimesForDisplay = async () => {
    try {
      let newDate = new Date();
      const nextAlarm = await fetchNextAlarm(newDate);
      const timeToSleep = await calcTimeToSleep(nextAlarm, newDate);
      setNextAlarm(nextAlarm);
      setTimeToSleep(timeToSleep);
    } catch (error) {
      console.log(error);
    }
  };

  // To display nextAlarm and timeToSleep
  useFocusEffect(
    React.useCallback(() => {
      fetchTimesForDisplay();
    }, [])
  );
  return (
    <View>
      <Clock updateCallback={fetchTimesForDisplay} />
      <View style={styles.capsule}>
        <View style={[styles.flex, styles.border]}>
          <Text style={styles.body}>alarm</Text>
          {!nextAlarm || !timeToSleep ? (
            <Text style={FontVariants.headerThin}>--:--</Text>
          ) : (
            <Text style={FontVariants.headerThin}>
              {nextAlarm["displayTime"]}
            </Text>
          )}
        </View>
        <View style={styles.flex}>
          <Text style={styles.body}>time to sleep</Text>
          {!nextAlarm || !timeToSleep ? (
            <Text style={FontVariants.headerThin}>--:--</Text>
          ) : (
            <Text style={FontVariants.headerThin}>
              {timeToSleep["hours"]}:{timeToSleep["minutes"]}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  capsule: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 20,
    textAlignVertical: "center",
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 100,
    borderColor: Colors.grey20,
  },
  flex: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  border: {
    borderRightWidth: 1,
    borderRightColor: Colors.grey20,
  },
  body: {
    ...FontVariants.body,
    marginRight: 10,
  },
});
