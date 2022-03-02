import React from "react";
import { Text, ImageBackground, StyleSheet, View, Image, Pressable } from "react-native";
import { PlayButton } from "../../components/common/PlayButton";
import { ScreenWrapper } from "../../components/common/ScreenWrapper.tsx";
import { Clock } from "../../components/logs/Clock";
import { Colors, FontVariants } from "../../styles";
import { useNavigation, StackActions } from "@react-navigation/native";
import { SingleLogScreenNavName } from "..";
import useProximity from "../../utils/useProximity";
import { BlackScreen } from "../../components/logs/BlackScreen";

export const LogScreenNavName = "Log";
export const LogsScreen = () => {  
  const { hasProximity } = useProximity();
  const navigation = useNavigation();
  const onAwakePressed = () => navigation.dispatch(StackActions.push(SingleLogScreenNavName));

  if (hasProximity) return <BlackScreen />;

  return (
    <ScreenWrapper title="Sleep logging" text="Start logging your sleep.">
      <Clock />
      <View style={styles.capsule}>
        <View style={[styles.flex, styles.border]}>
          <Text style={styles.body}>alarm</Text>
          <Text style={FontVariants.headerThin}>07:00</Text>
        </View>
        <View style={styles.flex}>
          <Text style={styles.body}>time to sleep</Text>
          <Text style={FontVariants.headerThin}>08:00</Text>
        </View>
      </View>
      <ImageBackground
        source={require("../../assets/images/semicircle.png")}
        style={styles.imgcontainer}
      >
        <PlayButton style={styles.btn} />
        <Pressable onPress={onAwakePressed} style={[styles.capsule, styles.flex, { marginTop: 100 }]}>
          <Text style={[FontVariants.subtitleThin, { marginRight: 30, color: Colors.grey20 }]}>I'm awake</Text>
          <Image source={require("../../assets/icons/forward.png")} />
        </Pressable>
      </ImageBackground>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  imgcontainer: {
    width: "100%",
    height: 400,
  },
  capsule: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.grey20,
    textAlignVertical: "center",
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 100,
  },
  flex: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: "center"
  },
  border: {
    borderRightWidth: 1,
    borderRightColor: Colors.grey20,
  },
  body: {
    ...FontVariants.body,
    marginRight: 10,
  },
  btn: {
    alignItems: "center",
    marginTop: -50,
  }
});
