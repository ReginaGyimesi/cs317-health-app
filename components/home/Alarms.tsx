import { useFocusEffect } from "@react-navigation/native";
import { Animated } from "react-native";
import React, { useEffect, useState } from "react";
import IonIcons from "react-native-vector-icons/Ionicons";
import { FeaturedTabWrapper } from "../../components/home/FeaturedTabWrapper";
import { Colors } from "../../styles";
import { deleteAlarm, fetchActiveAlarms } from "../../utils/alarmUtils";
import { showToast, ToastType } from "../../components/common/MessageToast";

export const Alarms = () => {
  // Set the initial alarms screen
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    try {
      setLoading(true);
      const data = await fetchActiveAlarms();
      setData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetch();
    }, [])
  );

  const [idx, setIdx] = useState(-1);

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

  return (
    <>
      {!data || data.length === 0 || loading ? (
        <FeaturedTabWrapper text="No alarms to display" />
      ) : (
        data.map((item, i) => {
          return (
            <FeaturedTabWrapper
              key={i}
              icon={
                <IonIcons name="alarm-outline" color={Colors.white} size={20} />
              }
              text={item.displayTime}
              longPressCallback={() => {
                setIdx(i);
              }}
              pressOutCallback={async () => {
                let message = await deleteAlarm(item.id);
                onPressOut();
                setIdx(-1);
                showToast(message, ToastType.SUCCESS);
                fetch(); // reload state
              }}
              op={idx === i ? 0.3 : 1}
            />
          );
        })
      )}
    </>
  );
};
