import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";
import * as Notifications from "expo-notifications";
import { StyleSheet } from "react-native";
import { Colors } from "../styles";

/**
 * Parsing the Time Picker object into a new Date object
 * @param clockValue  Object from Time Picker
 * @returns     Date object with set hours, minute
 */
export function parseDate(clockValue) {
  if (!clockValue) {
    return null;
  }

  console.log(clockValue);
  let hour = parseInt(clockValue[0]["index"]) + 1;
  let minute = parseInt(clockValue[1]["index"]);
  let amPm = clockValue[2]["value"];

  if (amPm === "PM") {
    hour += 12;
  }

  let currentDate = new Date();
  currentDate.setHours(hour, minute, 0, 0);

  // Add plus one day if selected time passed today
  if (currentDate < new Date()) {
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return currentDate;
}

/**
 * Save alarms into the local storage and schedule push notification as alarm
 * @param clockValue
 * @param selectedSound
 * @param isEnabled
 * @returns
 */
export async function saveAlarm(clockValue, isEnabled) {
  await Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: isEnabled,
      shouldSetBadge: true,
    }),
  });

  await Notifications.setNotificationChannelAsync("default", {
    name: "default",
    importance: Notifications.AndroidImportance.HIGH,
  });

  if (!clockValue) {
    Toast.show("Save alarm failed", {
      duration: 1000,
      containerStyle: styles.failedToast,
      opacity: 1,
    });
    return;
  }

  let date = parseDate(clockValue);
  if (!date || date === null) {
    Toast.show("Save alarm failed", {
      duration: 1000,
      containerStyle: styles.failedToast,
      opacity: 1,
    });
    return;
  }

  let newAlarm = {
    id: Math.round(Math.random() * 1000000000),
    displayTime:
      clockValue[0]["value"] +
      ":" +
      clockValue[1]["value"] +
      " " +
      clockValue[2]["value"],
    triggerTime: date,
    active: true,
    isVibrate: isEnabled,
  };

  console.log(newAlarm);

  let alarms;
  alarms = await AsyncStorage.getItem("alarms");

  if (!alarms) {
    console.log("New array");
    alarms = [];
  } else {
    alarms = JSON.parse(alarms);
  }

  alarms.push(newAlarm);

  alarms = JSON.stringify(alarms);

  AsyncStorage.setItem("alarms", alarms);

  Toast.show("Alarm saved", {
    duration: 1000,
    containerStyle: styles.successToast,
    opacity: 1,
  });

  console.log(alarms);

  // Schedule notification
  await schedulePushNotification(
    newAlarm["triggerTime"].getHours(),
    newAlarm["triggerTime"].getMinutes()
  );
}

async function schedulePushNotification(hour, minute) {
  console.log("Hours: " + hour);
  console.log("Minute: " + minute);
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "It's time to wake up!",
    },
    trigger: {
      hour: hour,
      minute: minute,
      repeats: true,
      channelId: "default",
    },
  });
}

/**
 * Util function for proper display of time
 * @param digit
 * @returns
 */
export function addZeroToDigits(digit) {
  if (digit) {
    let zeroAdded = `0${digit}`;
    return zeroAdded.substring(zeroAdded.length - 2);
  } else {
    return `00`;
  }
}

/**
 * Returns the saved alarms
 * @returns
 */
export async function fetchActiveAlarms() {
  let alarms;
  alarms = await AsyncStorage.getItem("alarms");

  if (!alarms) {
    alarms = [];
  } else {
    alarms = JSON.parse(alarms);
  }
  return alarms;
}

export async function fetchNextAlarm(dateFrom) {
  let nextAlarm;
  let fetched;
  fetched = await AsyncStorage.getItem("alarms");

  if (!fetched) {
    fetched = [];
  } else {
    fetched = JSON.parse(fetched);
  }

  for(let i = 0; i < fetched.length; i++){
    let currentItem = fetched[i];
    let currentAlarm = new Date(currentItem["triggerTime"]);
    let currentAlarmHour = currentAlarm.getHours();
    let currentAlarmMinute = currentAlarm.getMinutes();

    if(currentAlarmHour >= dateFrom.getHours()){
      if(currentAlarmMinute >= dateFrom.getMinutes()){
        if(!nextAlarm){
          nextAlarm = currentItem;
          continue;
        }
        let nextAlarmDate = new Date(nextAlarm["triggerTime"]);
        let nextAlarmHour = nextAlarmDate.getHours();
        let nextAlarmMinute = nextAlarmDate.getMinutes();

        if(currentAlarmHour < nextAlarmHour){
          nextAlarm = currentItem;
          continue;
        }

        if(currentAlarmHour === nextAlarmHour && currentAlarmMinute < nextAlarmMinute){
          nextAlarm = currentItem;
          continue;
        }
      }
    }
  }

  // We should search the next day item
  if(!nextAlarm){
    for(let i = 0; i < fetched.length; i++){
      let currentItem = fetched[i];
      let currentAlarm = new Date(currentItem["triggerTime"]);
      let currentAlarmHour = currentAlarm.getHours();
      let currentAlarmMinute = currentAlarm.getMinutes();

      if(currentAlarmHour+1 < dateFrom.getHours()){
        if(currentAlarmMinute < dateFrom.getMinutes()){
          if(!nextAlarm){
            nextAlarm = currentItem;
            continue;
          }
          let nextAlarmDate = new Date(nextAlarm["triggerTime"]);
          let nextAlarmHour = nextAlarmDate.getHours();
          let nextAlarmMinute = nextAlarmDate.getMinutes();
  
          if(currentAlarmHour < nextAlarmHour){
            nextAlarm = currentItem;
            continue;
          }
  
          if(currentAlarmHour === nextAlarmHour && currentAlarmMinute < nextAlarmMinute){
            nextAlarm = currentItem;
            continue;
          }
        }
      }
    }
  }

  return nextAlarm;
}

export async function calcTimeToSleep(alarm, currentTime) {
    let fromDate = currentTime;
    let alarmDate = new Date(alarm["triggerTime"]);
    let toDate = new Date();
    let toDateHour = alarmDate.getHours();
    let toDateMinute = alarmDate.getMinutes();
    toDate.setHours(toDateHour);
    toDate.setMinutes(toDateMinute);

    // Increase day
    if(toDateHour < fromDate.getHours()){
      toDate.setDate(toDate.getDate()+1);
    }

    let diff = toDate - fromDate;
    console.log("diff " + diff);
    let hoursToSleep = Math.abs(Math.round(diff / (1000*60*60)));
    let minutesToSleep = Math.abs(Math.round((diff - (1000*60*60*hoursToSleep)) / (1000*60)));

    return {hours:addZeroToDigits(hoursToSleep), minutes:addZeroToDigits(minutesToSleep)}
}

const styles = StyleSheet.create({
  failedToast: {
    backgroundColor: Colors.dangerRed,
    opacity: 1,
    borderRadius: 5,
    padding: 10,
  },
  successToast: {
    backgroundColor: Colors.acceptGreen,
    opacity: 1,
    borderRadius: 5,
    padding: 10,
  },
});
