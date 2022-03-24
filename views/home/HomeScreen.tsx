import { StackActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AlarmScreenNavName, LogScreenNavName, SoundsScreenNavName } from "..";
import { FeaturedCardWrapper } from "../../components/home/FeaturedCardWrapper";
import { FeaturedTabWrapper } from "../../components/home/FeaturedTabWrapper";
import { WelcomeView } from "../../components/home/WelcomeView";
import { Colors, FontVariants } from "../../styles";
import { Alarms } from "../../components/home/Alarms";
import { ActiveSounds } from "../../components/home/ActiveSounds";

export const HomeScreenNavName = "Home";
export const HomeScreen = () => {
  const navigation = useNavigation();

  const onAlarmPressed = () =>
    navigation.dispatch(StackActions.push(AlarmScreenNavName));
  const onSoundPressed = () => navigation.navigate(SoundsScreenNavName);
  const onLogPressed = () => navigation.navigate(LogScreenNavName);

  const featuredcards = [
    { style: styles.bgcolor1, title: "sounds", num: "01", nav: onSoundPressed },
    { style: styles.bgcolor2, title: "logging", num: "02", nav: onLogPressed },
    { style: styles.bgcolor3, title: "alarm", num: "03", nav: onAlarmPressed },
  ];

  return (
    <ScrollView>
      <View style={styles.basemargin}>
        <WelcomeView />
        <View>
          <View>
            <Text style={[styles.title, { marginTop: 50 }]}>Most used</Text>
            <View style={styles.row}>
              <ScrollView horizontal={true}>
                {featuredcards.map((featured, idx) => {
                  return (
                    <FeaturedCardWrapper
                      key={idx}
                      style={featured.style}
                      title={featured.title}
                      number={featured.num}
                      onPress={featured.nav}
                    />
                  );
                })}
              </ScrollView>
            </View>
          </View>
          <View style={[styles.rowjustify]}>
            <Text style={styles.title}>Your alarms</Text>
            <Pressable onPress={onAlarmPressed}>
              <Text style={styles.plustext}>+</Text>
            </Pressable>
          </View>
          <Alarms />
          <View>
            <View style={[styles.rowjustify]}>
              <Text style={styles.title}>Your sounds</Text>
              <Pressable onPress={onSoundPressed}>
                <Text style={styles.plustext}>+</Text>
              </Pressable>
            </View>
            <ActiveSounds />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    ...FontVariants.headerBold,
    color: Colors.grey20,
    marginBottom: 10,
    marginLeft: 30,
  },
  basemargin: {
    marginBottom: 50,
  },
  bgcolor1: { backgroundColor: Colors.opPurple, marginLeft: 30 },
  bgcolor2: { backgroundColor: Colors.opGreen, marginLeft: 15 },
  bgcolor3: { backgroundColor: Colors.opPink, marginLeft: 15, marginRight: 20 },
  row: {
    flexDirection: "row",
  },
  rowjustify: {
    flexDirection: "row",
    marginTop: 30,
    marginRight: 30,
    justifyContent: "space-between",
  },
  plustext: {
    ...FontVariants.headerBold,
    color: Colors.grey20,
  },
});
