import { useFocusEffect } from "@react-navigation/native";
import { useEffect, useState } from "react";
import React from "react";
import { deleteActiveSound, getActiveSounds } from "../../utils/soundFunctions";
import { FeaturedTabWrapper } from "../home/FeaturedTabWrapper";
import IonIcons from "react-native-vector-icons/Ionicons";
import { Colors } from "../../styles/Colors";

export const ActiveSounds = () => {
  const [data, setData] = useState<any[]>([]);

  const fetch = async () => {
    try {
      const data = await getActiveSounds();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetch();
    }, [])
  );

  return (
    <>
      {!data || data.length === 0 ? (
        <FeaturedTabWrapper text="No sounds active" />
      ) : (
        data.map((item, i) => {
          return (
            <FeaturedTabWrapper
              key={i}
              icon={
                <IonIcons name="musical-notes-outline" color={Colors.white} size={20} />
              }
              text={item.soundName}
              pressOutCallback={async () => {
                await deleteActiveSound(item.id);
                fetch(); // reload state
              }}
            />
          );
        })
      )}
    </>
  );
}