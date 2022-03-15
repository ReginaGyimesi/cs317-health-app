import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

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

  if(hour == 12 && amPm === "PM"){
    hour = 12;
  }
  else if(hour == 12 && amPm === "AM"){
    hour = 0;
  }
  else if (amPm === "PM") {
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
 * @returns   true if alarm save was successful, false otherwise
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

  // Somehow the data from the picker is not there -> display failure and return
  if (!clockValue) {
    return false;
  }

  // Parse the value from the picker as date, if fails, display failure and return
  let date = parseDate(clockValue);
  console.log(date);
  if (!date || date === null) {
    return false;
  }

  // Create the new alarm object
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

  // Fetch alarms from local storage and add new alarm
  let alarms;
  alarms = await AsyncStorage.getItem("alarms");

  if (!alarms) {
    alarms = [];  // No alarms created before
  } else {
    alarms = JSON.parse(alarms);
  }

  alarms.push(newAlarm);
  alarms = JSON.stringify(alarms);
  AsyncStorage.setItem("alarms", alarms);

  // Schedule notification
  await schedulePushNotification(
    newAlarm["triggerTime"].getHours(),
    newAlarm["triggerTime"].getMinutes()
  );

  return true;
}

async function schedulePushNotification(hour, minute) {
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
  let fetched = await fetchActiveAlarms();
  let alarmsIntoDates = [];

  for(let i = 0; i < fetched.length; i++){
    let currentItem = fetched[i];
    let currentAlarm = new Date(currentItem["triggerTime"]);
    let currentAlarmHour = currentAlarm.getHours();
    let currentAlarmMinute = currentAlarm.getMinutes();

    let newDate = new Date(dateFrom);
    newDate.setHours(currentAlarmHour);
    newDate.setMinutes(currentAlarmMinute);

    alarmsIntoDates.push({
        date: newDate,
        alarm: currentItem
    });
  }

  // Sorting dates array ascending
  alarmsIntoDates.sort(function(a,b){
    return a.date - b.date;
  });

  for(let i = 0; i < alarmsIntoDates.length; i++){
    if(alarmsIntoDates[i].date>dateFrom){
      return alarmsIntoDates[i].alarm;
    }
  }

  if(!alarmsIntoDates[0])
    return null;

  // Return first item, probably next day
  return alarmsIntoDates[0].alarm;
}

export async function calcTimeToSleep(alarm, currentTime) {

    if(!alarm)
      return;
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
    let hoursToSleep = Math.abs(Math.round(diff / (1000*60*60)));
    let minutesToSleep = Math.abs(Math.round((diff - (1000*60*60*hoursToSleep)) / (1000*60)));

    return {hours:addZeroToDigits(hoursToSleep), minutes:addZeroToDigits(minutesToSleep)}
}

export async function deleteAlarm(id) {
  let alarms;
  alarms = await AsyncStorage.getItem("alarms");

  if (!alarms) {
    alarms = [];
  } else {
    alarms = JSON.parse(alarms);
  }

  let removedText = "No alarm deleted";
  var removed = alarms.filter(function(value, index, arr){ 
    if(value["id"] === id){
      removedText = "Alarm deleted: " + value["displayTime"];
    }
    return value["id"] !== id;
  });
  
  removed = JSON.stringify(removed);

  await AsyncStorage.setItem("alarms", removed);
}
