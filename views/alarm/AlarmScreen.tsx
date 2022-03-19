import React, { useState } from "react";
import { ScreenWrapper } from "../../components/common/ScreenWrapper.tsx";
import { Text, View, Switch, StyleSheet, Animated } from "react-native";
import RNDateTimeSelector from "react-native-date-time-scroll-picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { saveAlarm, addZeroToDigits } from "../../utils/alarmUtils";
import { Colors } from "../../styles";
import { showToast, ToastType } from "../../components/common/MessageToast";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

// Time Picker initialization
const borderWidth = 45;
const setTimerWidthHeight = wp(85);
const selectedItemTextSize = 30;
const wrapperHeight = setTimerWidthHeight - borderWidth * 2;
export const AlarmScreenNavName = "Alarm";
export const AlarmScreen = () => {
  const navigation = useNavigation();

  // Button animation
  const animatedButtonScale = new Animated.Value(1);
  const onPressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 0.95,
      speed: 999,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const animatedScaleStyle = {
    transform: [{ scale: animatedButtonScale }],
  };

  // Initial clock values
  const [clockValue, setClockValue] = useState([
    {
      index: 8,
      value: "09",
    },
    {
      index: 25,
      value: "25",
    },
    {
      index: 0,
      value: "AM",
    },
  ]);

  const dataSet = {
    data: {
      firstColumn: [...Array(12).keys()].map((item, idx) => {
        return { value: addZeroToDigits(item + 1), index: idx + 1 };
      }),
      secondColumn: [...Array(60).keys()].map((item, idx) => {
        return { value: addZeroToDigits(item), index: idx };
      }),
      thirdColumn: [
        { value: "AM", index: 0 },
        { value: "PM", index: 1 },
      ],
    },
    initials: [8, 25, 0],
  };

  // Vibration switch toggle
  const [isVibrate, setIsVibrate] = useState(false);
  const toggleVibration = () => {
    setIsVibrate((previousState) => !previousState);
  };

  return (
    <ScreenWrapper title="Set alarm" text="">
      <View style={styles.dateTimeSelectorContainer}>
        <RNDateTimeSelector
          dataSet={dataSet}
          onValueChange={(value: any) => {
            setClockValue(value);
          }}
          containerStyle={styles.dateTimeSelector}
          firstSeperatorComponent={() => <Text style={styles.separator}></Text>}
          secondSeperatorComponent={() => (
            <Text style={styles.separator}></Text>
          )}
          seperatorContainerStyle={{ width: wp(10) }}
          scrollPickerOptions={{
            fontSize: 90,
            itemHeight: 90,
            wrapperHeight: wrapperHeight,
            wrapperColor: "rgba(255,255,255,0)",
            highlightColor: "rgba(255,255,255,255.9)",
          }}
          textStyle={styles.scrollPickerOptionsTextStyle}
          textColor={{
            primary: "rgba(255,255,255,1.0)",
            secondary: "rgba(255,255,255,0.6)",
            other: "rgba(255,255,255,0.6)",
          }}
        />
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.vibrationText}>Alarm with vibration</Text>
        <View style={styles.vibrationSwitchHolder}>
          <Switch
            trackColor={{ false: Colors.darkPurple, true: Colors.lightPurple }}
            thumbColor={isVibrate ? Colors.white : Colors.grey20}
            ios_backgroundColor={Colors.darkPurple}
            onValueChange={toggleVibration}
            value={isVibrate}
          />
        </View>
      </View>
      <TouchableWithoutFeedback
        onPress={async () => {
          const success = await saveAlarm(clockValue, isVibrate);
          showToast(
            success ? "Alarm saved!" : "Alarm dave failed!",
            success ? ToastType.SUCCESS : ToastType.FAILURE
          );
          navigation.goBack();
        }}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <Animated.Text style={[styles.saveText, animatedScaleStyle]}>
          Save alarm
        </Animated.Text>
      </TouchableWithoutFeedback>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  dateTimeSelectorContainer: {
    width: wp(80),
    height: wp(65),
    backgroundColor: Colors.opPurple,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  dateTimeSelector: {
    height: wp(61.5),
    alignSelf: "center",
    borderWidth: 0,
    borderColor: "transparent",
    borderRadius: 0,
    color: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollPickerOptionsTextStyle: {
    fontSize: selectedItemTextSize,
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    width: wp(80),
    height: wp(10),
    alignItems: "center",
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: hp(5),
  },
  vibrationText: {
    flex: 2,
    color: Colors.white,
    marginLeft: 10,
    fontSize: 16,
  },
  vibrationSwitchHolder: {
    flex: 1,
    color: Colors.white,
    marginLeft: "auto",
    marginRight: "auto",
  },
  separator: {
    fontSize: selectedItemTextSize,
    lineHeight: setTimerWidthHeight * 0.15,
    color: Colors.white,
  },
  saveText: {
    backgroundColor: Colors.opPurple,
    color: Colors.white,
    width: wp(50),
    fontSize: hp(3),
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: hp(5),
    borderRadius: 5,
  },
});
