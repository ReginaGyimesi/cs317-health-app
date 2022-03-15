import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { FontVariants, Colors } from "../../styles";

type ClockProps = {
  updateCallback: any;
};

export const Clock = ({updateCallback}:ClockProps) => {
  let time = new Date();
  const [currtime, setcurrtime] = useState(time);

  function update() {
    setcurrtime(new Date());
    updateCallback();
  }

  useEffect(() => {
    setInterval(update, 1000);
  }, []);

  return (
    <View>
      <Text style={stylesheet.text}>{currtime?.toLocaleTimeString()}</Text>
    </View>
  );
};

const stylesheet = StyleSheet.create({
  text: {
    ...FontVariants.headerLarge,
    textAlign: "center",
    justifyContent: "center",
    color: Colors.grey20
  },
});
