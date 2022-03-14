import React, { useState } from "react";
import { ScreenWrapper } from "../../components/common/ScreenWrapper.tsx";
import { Text, View, Button, Switch, StyleSheet } from 'react-native';
import RNDateTimeSelector from "react-native-date-time-scroll-picker";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Picker} from '@react-native-picker/picker';
import { saveAlarm, addZeroToDigits } from "../../utils/alarmHandler"

// Time Picker initialization
const borderWidth = 45;
const setTimerWidthHeight = wp(85);
const selectedItemTextSize = 30;
const wrapperHeight = setTimerWidthHeight-(borderWidth*2);

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

  // Sound list save
  const [selectedSound, setSelectedSound] = useState();
  const saveSound = (item) => {
    setSelectedSound(item);
    sound = item;
  };

  // Vibration switch toggle
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleVibration = () => {
    setIsEnabled(previousState => !previousState);
    vibrate = !isEnabled;
  }

  const separatorComponentRendererOne = () => {
    return <Text style={{fontSize: selectedItemTextSize, lineHeight: setTimerWidthHeight*0.15,color: 'white'}}>:</Text>
  }
  const separatorComponentRendererTwo = () => {
    return <Text style={{fontSize: selectedItemTextSize, lineHeight: setTimerWidthHeight*0.15,color: 'white'}}></Text>
  }

  return (
      <ScreenWrapper title="Set alarm" text="">
        <View style={styles.dateTimeSelectorContainer}>
          <RNDateTimeSelector 
                        dataSet={dataSet}
                        onValueChange={(value)=>{clockValue = value;}}
                        containerStyle={styles.dateTimeSelector}
                        firstSeperatorComponent={separatorComponentRendererOne}
                        secondSeperatorComponent={separatorComponentRendererTwo}
                        seperatorContainerStyle={{width: wp(10)}}
                        scrollPickerOptions={{
                          fontSize: 90,
                          itemHeight: 90,
                          wrapperHeight: wrapperHeight,
                          wrapperColor: "rgba(255,255,255,0)",
                          highlightColor: "rgba(255,255,255,255.9)"
                        }}
                        textStyle={ styles.scrollPickerOptionsTextStyle}
                        textColor={{    
                          primary: 'rgba(255,255,255,1.0)',
                          secondary: 'rgba(255,255,255,0.6)',
                          other: 'rgba(255,255,255,0.6)'
                        }}
              />
        </View>
        <View style={styles.alarmSoundsContainer}>
          <Text style={styles.alarmSoundsContainerText}>
            Alarm Sounds
          </Text>
          <View style={styles.pickerHolder}>
            <Picker
              selectedValue={selectedSound}
              onValueChange={(itemValue, itemIndex) =>
                saveSound(itemValue)
              }
              style={styles.picker}>
              <Picker.Item label="Sound 1" value="s1" />
              <Picker.Item label="Sound 2" value="s2" />
              <Picker.Item label="Sound 3" value="s3" />
            </Picker>
          </View>
        </View>
        <View style={styles.vibrationHolder}>
          <Text style={styles.vibrationText}>
            Alarm with vibration
          </Text>
          <View style={styles.vibrationSwitchHolder}>
            <Switch         
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleVibration}
              value={isEnabled}>
            </Switch>
          </View>
        </View>
        <View style={styles.saveAlarmHolder}>
          <Button 
          title="Save alarm"
          onPress={() => saveAlarm(clockValue, selectedSound, isEnabled)}
          >
          </Button>
        </View>
      </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  dateTimeSelectorContainer : {
    width: wp(80),
    height: wp(65),
    backgroundColor: '#A44FAB',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  dateTimeSelector : {
    alignSelf: 'center',
    borderWidth: 0, 
    borderColor: 'transparent', 
    borderRadius: 0, 
    height: wp(61.5),
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollPickerOptionsTextStyle : {
    fontSize: selectedItemTextSize
  },
  alarmSoundsContainer : {
    display: 'flex',
    flexDirection: "row",
    width: wp(80),
    height: wp(25),
    backgroundColor: 'green',
    alignItems: "center",
    borderRadius: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: hp(1)
  },
  alarmSoundsContainerText : {
    flex: 1,
    color: 'white',
    marginLeft: 10,
    fontSize: 16
  },
  pickerHolder : {
    flex: 2,
    color: 'white',
    borderColor: 'white',
    borderWidth: 3,
    borderStyle: 'solid',
    borderRadius: 30,
    marginRight: 5
  },
  picker : {
    color: 'white'
  },
  vibrationHolder : {
    display: 'flex',
    flexDirection: "row",
    width: wp(80),
    height: wp(10),
    backgroundColor: 'green',
    alignItems: "center",
    borderRadius: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: hp(1)
  },
  vibrationText : {
    flex: 2,
    color: 'white',
    marginLeft: 10,
    fontSize: 16
  },
  vibrationSwitchHolder: {
    flex: 1,
    color: 'white',
    marginRight: 20
  },
  saveAlarmHolder : {
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
  }
});