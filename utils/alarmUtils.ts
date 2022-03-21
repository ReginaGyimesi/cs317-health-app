import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

/**
 * Parsing the Time Picker object into a new Date object
 * @param clockValue  Object from Time Picker
 * @returns     Date object with set hours, minute
 */
export function parseDate(clockValue: any) {
  if (!clockValue) {
    return null;
  }

  let hour = parseInt(clockValue[0].index) + 1;
  const minute = parseInt(clockValue[1].index);
  const amPm = clockValue[2].value;

  if (hour == 12 && amPm === "PM") {
    hour = 12;
  } else if (hour == 12 && amPm === "AM") {
    hour = 0;
  } else if (amPm === "PM") {
    hour += 12;
  }

  const currentDate = new Date();
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
 * @returns   true if alarm save was successful, false otherwise
 */
export async function saveAlarm(clockValue: any, isEnabled: boolean) {
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

  // Somehow the data from the picker is not there -> display failure and return
  if (!clockValue) {
    return false;
  }

  // Parse the value from the picker as date, if fails, return
  const date = parseDate(clockValue);
  if (!date || date === null) {
    return false;
  }

  // Create the new alarm object
  const newAlarm = {
    id: "",
    displayTime:
      clockValue[0].value +
      ":" +
      clockValue[1].value +
      " " +
      clockValue[2].value,
    triggerTime: date,
    active: true,
    isVibrate: isEnabled,
  };

  // Schedule notification
  await schedulePushNotification(
    newAlarm,
    newAlarm.triggerTime.getHours(),
    newAlarm.triggerTime.getMinutes()
  );

  // Fetch alarms from local storage and add new alarm
  let alarms;
  alarms = await AsyncStorage.getItem("alarms");

  if (!alarms) {
    alarms = []; // No alarms created before
  } else {
    alarms = JSON.parse(alarms);
  }

  alarms.push(newAlarm);
  alarms = JSON.stringify(alarms);
  AsyncStorage.setItem("alarms", alarms);

  return true;
}

async function schedulePushNotification(newAlarm: any, hour: any, minute: any) {
  const identifier = await Notifications.scheduleNotificationAsync({
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

  // Notification ID will be the alarms ID as well
  newAlarm.id = identifier;
}

/**
 * Util function for proper display of time
 * @param digit
 * @returns
 */
export function addZeroToDigits(digit: number) {
  if (digit) {
    const zeroAdded = `0${digit}`;
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

  // Sort alarms for better UX
  const dateFrom = new Date();
  const alarmsIntoDates = [];

  for (let i = 0; i < alarms.length; i++) {
    const currentItem = alarms[i];
    const currentAlarm = new Date(currentItem.triggerTime);
    const currentAlarmHour = currentAlarm.getHours();
    const currentAlarmMinute = currentAlarm.getMinutes();

    const newDate = new Date(dateFrom);
    newDate.setHours(currentAlarmHour);
    newDate.setMinutes(currentAlarmMinute);

    alarmsIntoDates.push({
      date: newDate,
      alarm: currentItem,
    });
  }

  // Sorting dates array ascending
  alarmsIntoDates.sort(function (a: any, b: any) {
    return a.date - b.date;
  });

  const sortedAlarms = [];
  for (let i = 0; i < alarmsIntoDates.length; i++) {
    sortedAlarms.push(alarmsIntoDates[i].alarm);
  }

  return sortedAlarms;
}

/**
 * Returns the next available alarm calculated from the passed Date
 * @param dateFrom    Date to be calculated from
 * @returns
 */
export async function fetchNextAlarm(dateFrom: Date) {
  const fetched = await fetchActiveAlarms();
  const alarmsIntoDates = [];

  for (let i = 0; i < fetched.length; i++) {
    const currentItem = fetched[i];
    const currentAlarm = new Date(currentItem.triggerTime);
    const currentAlarmHour = currentAlarm.getHours();
    const currentAlarmMinute = currentAlarm.getMinutes();

    const newDate = new Date(dateFrom);
    newDate.setHours(currentAlarmHour);
    newDate.setMinutes(currentAlarmMinute);

    alarmsIntoDates.push({
      date: newDate,
      alarm: currentItem,
    });
  }

  // Sorting dates array ascending
  alarmsIntoDates.sort(function (a: any, b: any) {
    return a.date - b.date;
  });

  for (let i = 0; i < alarmsIntoDates.length; i++) {
    if (alarmsIntoDates[i].date > dateFrom) {
      return alarmsIntoDates[i].alarm;
    }
  }

  if (!alarmsIntoDates[0]) return null;

  // Return first item, probably next day
  return alarmsIntoDates[0].alarm;
}

/**
 * Calculates the time difference between the alarm and the time it was passed
 * @param alarm
 * @param currentTime
 * @returns {hours, minutes}  eg.: {hours:03, minutes:25} or {hours:17, minutes:08}
 */
export async function calcTimeToSleep(alarm: any, currentTime: any) {
  if (!alarm) return;
  const fromDate = currentTime;
  const alarmDate = new Date(alarm.triggerTime);
  const toDate = new Date();
  const toDateHour = alarmDate.getHours();
  const toDateMinute = alarmDate.getMinutes();
  toDate.setHours(toDateHour);
  toDate.setMinutes(toDateMinute);

  // Increase day
  if (toDateHour < fromDate.getHours()) {
    toDate.setDate(toDate.getDate() + 1);
  } else if (
    toDateHour === fromDate.getHours() &&
    toDateMinute < fromDate.getMinutes()
  ) {
    toDate.setDate(toDate.getDate() + 1);
  } else if (
    toDateHour === fromDate.getHours() &&
    toDateMinute === fromDate.getMinutes()
  ) {
    // Exact minute where the alarm should be triggered
    return {
      hours: "24",
      minutes: "00",
    };
  } 

  const diff = toDate - fromDate;
  let hoursToSleep = Math.abs(Math.round(diff / (1000 * 60 * 60)));
  if (hoursToSleep === 24) {
    hoursToSleep = 23;
  }

  let minutesToSleep = Math.abs(
    Math.round((diff - 1000 * 60 * 60 * hoursToSleep) / (1000 * 60))
  );
  if (minutesToSleep === 60) {
    minutesToSleep = 59;
  }

  return {
    hours: addZeroToDigits(hoursToSleep),
    minutes: addZeroToDigits(minutesToSleep),
  };
}

/**
 * Removes the scheduled push notification by the passed alarm ID
 * @param id
 */
async function removePushNotification(id: string) {
  await Notifications.cancelScheduledNotificationAsync(id);
}

/**
 * Removes alarm from local storage and from the scheduled notifications
 * @param id
 * @returns toast message
 */
export async function deleteAlarm(id: string) {
  await removePushNotification(id);

  let alarms;
  alarms = await AsyncStorage.getItem("alarms");

  if (!alarms) {
    alarms = [];
  } else {
    alarms = JSON.parse(alarms);
  }

  let removedText = "No alarm deleted";
  let removed = alarms.filter(function (value: any) {
    if (value.id === id) {
      removedText = "Alarm deleted: " + value.displayTime;
    }
    return value.id !== id;
  });

  removed = JSON.stringify(removed);

  await AsyncStorage.setItem("alarms", removed);

  return removedText;
}
