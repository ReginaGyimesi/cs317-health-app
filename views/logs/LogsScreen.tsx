import React from "react";
import {
  Text,
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Pressable,
} from "react-native";
import { PlayButton } from "../../components/common/PlayButton";
import { ScreenWrapper } from "../../components/common/ScreenWrapper.tsx";
import { Clock } from "../../components/logs/Clock";
import { Colors, FontVariants } from "../../styles";
import { useNavigation, StackActions } from "@react-navigation/native";
import { SingleLogScreenNavName } from "..";
// import useProximity from "../../utils/useProximity";
// import { BlackScreen } from "../../components/logs/BlackScreen";
import { useState, useEffect } from "react";
import { Accelerometer } from "expo-sensors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useFocusEffect } from "@react-navigation/native";
import { fetchNextAlarm, calcTimeToSleep } from "../../utils/alarmUtils";

// this is shake sensitivity - lowering this will give high sensitivity and increasing this will give lower sensitivity
const THRESHOLD = 0.3;
export const LogScreenNavName = "Log";
export const LogsScreen = () => {
  const navigation = useNavigation();
  // const { hasProximity } = useProximity();
  // if (hasProximity) return <BlackScreen />;

  const [subscription, setSubscription] = useState(null);
  const [start, setStart] = useState(new Date());
  const [shakes, setShakes] = useState(0);
  const _subscribe = () => {
    setStart(new Date());
    Accelerometer.setUpdateInterval(1000);
    let last_x, last_y, last_z;
    let lastUpdate = 0;
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        let { x, y, z } = accelerometerData;
        let currTime = Date.now();
        if (currTime - lastUpdate > 100) {
          let diffTime = currTime - lastUpdate;
          lastUpdate = currTime;
          let speed =
            (Math.abs(x + y + z - last_x - last_y - last_z) / diffTime) * 10000;
          if (speed > THRESHOLD) {
            setShakes((count) => count + 1);
          }
          last_x = x;
          last_y = y;
          last_z = z;
        }
      })
    );
  };

  const [end, setEnd] = useState(new Date());
  const _unsubscribe = () => {
    subscription && subscription.remove();
    setEnd(new Date());
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe;
  }, [_subscribe, _unsubscribe]);

  let timeInBed = end.getTime() - start.getTime();
  let lightSleep = shakes * 1000;
  let deepSleep = timeInBed - lightSleep;

  let sleepData = {
    timeInBed: timeInBed,
    lightSleep: lightSleep,
    deepSleep: deepSleep,
    added: end,
  };

  let disabled = sleepData.timeInBed === 0

  const onAwakePressed = async () => {
    let data;
    data = await AsyncStorage.getItem("loggedHours");

    if (!data) {
      data = [];
    } else {
      data = JSON.parse(data);
    }

    data.push(sleepData);
    data = JSON.stringify(data);
    AsyncStorage.setItem("loggedHours", data);
    navigation.dispatch(StackActions.push(SingleLogScreenNavName));
  };

  // Set the initial alarms screen data --------------------------------------------------
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

  // To display nextAlarm and timeToSleep on componentDidMount
  useFocusEffect(
    React.useCallback(() => {
      fetchTimesForDisplay();
    }, [])
  );

  let nextAlarmDisplay;
  let hoursToSleep;
  if (!nextAlarm || !timeToSleep) {
    nextAlarmDisplay = <Text style={FontVariants.headerThin}>--:--</Text>;
    hoursToSleep = <Text style={FontVariants.headerThin}>--:--</Text>;
  } else {
    nextAlarmDisplay = <Text style={FontVariants.headerThin}>{nextAlarm["displayTime"]}</Text>;
    hoursToSleep = <Text style={FontVariants.headerThin}>{timeToSleep["hours"]}:{timeToSleep["minutes"]}</Text>;
  }

  return (
    <ScreenWrapper title="Sleep logging" text="Start logging your sleep.">
      <Clock updateCallback={fetchTimesForDisplay}/>
      <View style={[styles.capsule, {borderColor: Colors.grey20}]}>
        <View style={[styles.flex, styles.border]}>
          <Text style={styles.body}>alarm</Text>
          {nextAlarmDisplay}
        </View>
        <View style={styles.flex}>
          <Text style={styles.body}>time to sleep</Text>
          {hoursToSleep}
        </View>
      </View>
      <ImageBackground
        source={require("../../assets/images/semicircle.png")}
        style={styles.imgcontainer}
      >
        <PlayButton
          onPress={subscription ? _unsubscribe : _subscribe}
          start={subscription ? false : true}
          style={styles.btn}
        />
        <Pressable
          onPress={onAwakePressed}
          style={[styles.capsule, styles.flex, { marginTop: 100, borderColor: (subscription || disabled) ? Colors.grey40 : Colors.grey20 }]}
          disabled={(subscription || disabled) ? true : false}
        >
          <Text
            style={[
              FontVariants.subtitleThin,
              { marginRight: 30, color: (subscription || disabled) ? Colors.grey40 : Colors.grey20 },
            ]}
          >
            I'm awake
          </Text>
          <MaterialCommunityIcons
        name={"chevron-right"}
        color={(subscription || disabled) ? Colors.grey40 : Colors.grey20}
        size={20}
      />
        </Pressable>
      </ImageBackground>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  imgcontainer: {
    width: "100%",
    height: 400,
  },
  capsule: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 20,
    textAlignVertical: "center",
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 100,
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
  btn: {
    alignItems: "center",
    marginTop: -50,
  },
});
