import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';

export async function triggerAlarms() {
  
    let alarms;
    alarms = await AsyncStorage.getItem('alarms');

    if(!alarms){
        return;
    }

    alarms = JSON.parse(alarms);

    for(let i = 0; i < alarms.length; i++){
        let currentAlarm = alarms[i];
        let currentTime = new Date();
        if(currentAlarm["active"] === true){
            let alarmTime = new Date(currentAlarm["triggerTime"]);
            if(alarmTime.getHours() === currentTime.getHours() && alarmTime.getMinutes() === currentTime.getMinutes()){
                console.log("ALARM FOUND :" + currentAlarm);
            }
        }
    }

    console.log("No alarm found");
    return false;
  
}

/**
 * Parsing the Time Picker object into a new Date object
 * @param clockValue 
 * @returns 
 */
export function parseDate(clockValue) {

    if(!clockValue){
        return null;
    }
  
    console.log(clockValue);
    let hour = parseInt(clockValue[0]["index"])+1;
    let minute = parseInt(clockValue[1]["index"]);
    let amPm = clockValue[2]["value"];

    if(amPm === "PM"){
        hour += 12;
    }

    let currentDate = new Date();
    // UTC problems?
    currentDate.setHours(hour, minute, 0, 0)

    if(currentDate < new Date()){
    currentDate.setDate(currentDate.getDate() + 1);
    }

    return currentDate;
}

/**
 * Save alarms into the local storage
 * @param clockValue 
 * @param selectedSound 
 * @param isEnabled 
 * @returns 
 */
export async function saveAlarm(clockValue, selectedSound, isEnabled) {
    await AsyncStorage.clear();
    if(!clockValue){
      Toast.show('Save alarm failed', {
        duration: 1000,
        containerStyle: {backgroundColor: 'red',opacity: 1, borderRadius: 5,padding: 10},
        opacity: 1
      });
      return;
    }

    let date = parseDate(clockValue);
    if(!date || date === null){
      Toast.show('Save alarm failed', {
        duration: 1000,
        containerStyle: {backgroundColor: 'red',opacity: 1, borderRadius: 5,padding: 10},
        opacity: 1
      });
      return;
    }

    let newAlarm = {
      id: Math.round((Math.random()*1000000000)),
      displayTime: clockValue[0]["value"] + ":" + clockValue[1]["value"] + " " + clockValue[2]["value"],
      triggerTime: date,
      active: true,
      triggerSound: selectedSound,
      isVibrate: isEnabled
    }

    console.log(newAlarm);

    let alarms;
    alarms = await AsyncStorage.getItem('alarms');

    if(!alarms){
      console.log("New array");
      alarms = [];
    }
    else{
      alarms = JSON.parse(alarms);
    }

    alarms.push(newAlarm);

    alarms = JSON.stringify(alarms);

    AsyncStorage.setItem('alarms',alarms);

    Toast.show('Alarm saved', {
      duration: 1000,
      containerStyle: {backgroundColor: 'green',opacity: 1, borderRadius: 5,padding: 10},
      opacity: 1
    });

    console.log(alarms);
}

export function addZeroToDigits(digit){
    if(digit){
      let zeroAdded = `0${digit}`;
      return zeroAdded.substring(zeroAdded.length - 2);
    }
    else {
      return `00`;
    }
}
