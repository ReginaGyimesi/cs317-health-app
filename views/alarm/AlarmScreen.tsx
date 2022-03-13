import React, { useEffect, useState, useRef } from "react";
import { ScreenWrapper } from "../../components/common/ScreenWrapper.tsx";
import { Text, View, Button, Switch } from 'react-native';
import RNDateTimeSelector from "react-native-date-time-scroll-picker";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Picker} from '@react-native-picker/picker';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const borderWidth = 45;
const setTimerWidthHeight = wp(85);
const selectedItemTextSize = 30;
const wrapperHeight = setTimerWidthHeight-(borderWidth*2);

const addZeroToDigits = (digit)=>{
  if(digit){
    let zeroAdded = `0${digit}`;
    return zeroAdded.substring(zeroAdded.length - 2);
  }else{
    return `00`;
  }
  
}

const dataSet = {
  data: {
    firstColumn: [...Array(12).keys()].map((item, idx)=> {return {value: addZeroToDigits(item+1), index: idx+1}}),
    secondColumn: [...Array(60).keys()].map((item, idx)=> {return {value: addZeroToDigits(item), index: idx}}),
    thirdColumn: [
      {value: 'AM', index: 0},
      {value: 'PM', index: 1}
    ],
  },
  initials: [8,25,0]  
}

export const AlarmScreenNavName = "Alarm";
export const AlarmScreen = () => {

  let clockValue = [
    {
      "index": 8,
      "value": "09",
    },
    {
      "index": 28,
      "value": "28",
    },
    {
      "index": 0,
      "value": "AM",
    }
  ];
  let sound;
  let vibrate;

  const [selectedSound, setSelectedSound] = useState();

  const logSound = (item) => {
    console.log("Sound set:" + item);
    setSelectedSound(item);
    sound = item;
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    vibrate = !isEnabled;
    console.log(vibrate);
  }

  const seperatorComponentRendererOne = ()=>{
    return <Text style={{fontSize: selectedItemTextSize, lineHeight: setTimerWidthHeight*0.15,color: 'white'}}>:</Text>
  }
  const seperatorComponentRendererTwo = ()=>{
    return <Text style={{fontSize: selectedItemTextSize, lineHeight: setTimerWidthHeight*0.15,color: 'white'}}></Text>
  }

  const saveAlarm = async () => {
    await AsyncStorage.clear();
      if(!clockValue){
        Toast.show('Save alarm failed', {
          duration: 1000,
          containerStyle: {backgroundColor: 'red',opacity: 1, borderRadius: 5,padding: 10}
        });
        return;
      }

      let date = parseToDate();
      if(!date || date === null){
        Toast.show('Save alarm failed in date parse', {
          duration: 1000,
          containerStyle: {backgroundColor: 'red',opacity: 1, borderRadius: 5,padding: 10}
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
        containerStyle: {backgroundColor: 'green',opacity: 1, borderRadius: 5,padding: 10}
      });

      console.log(alarms);
    
  }

  const parseToDate = () => {
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

  return (
      <ScreenWrapper title="Set alarm" text="" style={{justifyContent: 'center',
      alignItems: 'center',display: 'flex'}}>
        <View style={{
          display: 'flex',
          width: wp(80),
          height: wp(65),
          backgroundColor: '#A44FAB',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 40,
          marginRight: 40
        }}>
          <RNDateTimeSelector 
                        dataSet={dataSet}
                        onValueChange={(value)=>{
                          clockValue = value;
                        }}
                        containerStyle={{
                          alignSelf: 'center',
                          borderWidth: 0, 
                          borderColor: 'transparent', 
                          borderRadius: 0, 
                          height: wp(61.5),
                          color: 'white',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                        firstSeperatorComponent={seperatorComponentRendererOne}
                        secondSeperatorComponent={seperatorComponentRendererTwo}
                        seperatorContainerStyle={{
                          width: wp(10)
                        }}
                        scrollPickerOptions={{
                          itemHeight: 90,
                          wrapperHeight: wrapperHeight,
                          wrapperColor: "rgba(255,255,255,0)",
                          highlightColor: "rgba(255,255,255,255.9)",
                          fontSize:90
                        }}
                        textStyle={{
                          fontSize: selectedItemTextSize,
                          fontFamily: null
                        }}
                        textColor={{
                          primary: 'rgba(255,255,255,1.0)',
                          secondary: 'rgba(255,255,255,0.6)',
                          other: 'rgba(255,255,255,0.6)',
                        }}
              />
        </View>
        <View style={{
          display: 'flex',
          flexDirection: "row",
          width: wp(80),
          height: wp(25),
          backgroundColor: 'green',
          alignItems: "center",
          borderRadius: 10,
          marginLeft: 40,
          marginRight: 40,
          marginTop: 10
        }}>
          <Text style={{
              flex: 1,
              color: 'white',
              marginLeft: 10,
              fontSize: 16
            }}>
            Alarm Sounds
          </Text>
          <View style={{
                flex: 2,
                color: 'white',
                borderColor: 'white',
                borderWidth: 3,
                borderStyle: 'solid',
                borderRadius: 30,
                marginRight: 5
              }}>
            <Picker
              selectedValue={selectedSound}
              onValueChange={(itemValue, itemIndex) =>
                logSound(itemValue)
              }
              style={{
                color: 'white'
              }}>
              <Picker.Item label="Sound 1" value="s1" />
              <Picker.Item label="Sound 2" value="s2" />
              <Picker.Item label="Sound 3" value="s3" />
            </Picker>
          </View>
        </View>
        <View style={{
          display: 'flex',
          flexDirection: "row",
          width: wp(80),
          height: wp(10),
          backgroundColor: 'green',
          alignItems: "center",
          borderRadius: 10,
          marginLeft: 40,
          marginRight: 40,
          marginTop: 10
        }}>
          <Text style={{
              flex: 2,
              color: 'white',
              marginLeft: 10,
              fontSize: 16
            }}>
            Alarm with vibration
          </Text>
          <View style={{
                flex: 1,
                color: 'white',
                marginRight: 20
              }}>
            <Switch         
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}>
            </Switch>
          </View>
        </View>
        <View style={{
          display: 'flex',
          flexDirection: "row",
          width: wp(80),
          height: wp(10),
          textAlign: "center",
          backgroundColor: 'green',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 10
        }}>
          <Button 
          title="Save alarm"
          onPress={() => saveAlarm()}
          style={{
            flex: 1,
            width: wp(80),
            height: wp(10),
            backgroundColor: 'green',
            borderRadius: 10,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 10
          }}>
          </Button>
        </View>
      </ScreenWrapper>
  );
};