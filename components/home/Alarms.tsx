import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import IonIcons from "react-native-vector-icons/Ionicons";
import { FeaturedTabWrapper } from "../../components/home/FeaturedTabWrapper";
import { Colors } from "../../styles";
import { deleteAlarm, fetchActiveAlarms } from "../../utils/alarmUtils";
import { showToast, ToastType } from "../../components/common/MessageToast"

export const Alarms = () => {
  // Set the initial alarms screen
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
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

      fetch();
    }, [])
  );

  const [idx, setIdx] = useState(-1);

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
              pressOutCallback={async() => {
                let message = await deleteAlarm(item.id);
                setIdx(-1);
                showToast(message, ToastType.SUCCESS);
              }}
              op={idx === i ? 0.3 : 1}
            />
          );
        })
      )}
    </>
  );
};
