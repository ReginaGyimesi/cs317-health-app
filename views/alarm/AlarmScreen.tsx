import React, { useEffect, useState, useRef } from "react";
import { ScreenWrapper } from "../../components/common/ScreenWrapper.tsx";
import { Text, View, Button, Switch } from "react-native";
import RNDateTimeSelector from "react-native-date-time-scroll-picker";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Picker} from '@react-native-picker/picker';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

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
    firstColumn: [...Array(13).keys()].map((item, idx)=> {return {value: addZeroToDigits(item), index: idx}}),
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

  const [selectedSound, setSelectedSound] = useState();

  const logSound = (item) => {
    console.log("Sound set:" + item);
    setSelectedSound(item);
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    console.log("Vibration:" + !isEnabled);
  }

  const seperatorComponentRendererOne = ()=>{
    return <Text style={{fontSize: selectedItemTextSize, lineHeight: setTimerWidthHeight*0.15,color: 'white'}}>:</Text>
  }
  const seperatorComponentRendererTwo = ()=>{
    return <Text style={{fontSize: selectedItemTextSize, lineHeight: setTimerWidthHeight*0.15,color: 'white'}}></Text>
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
                        console.log('data on users end :   ... ', value);
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
        height: wp(25),
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
    </ScreenWrapper>
  );
};