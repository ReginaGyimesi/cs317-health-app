import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";

export default async function triggerAlarms() {
  
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
                return currentAlarm;
            }
        }
    }

    console.log("No alarm found");
    return false;
  
}
