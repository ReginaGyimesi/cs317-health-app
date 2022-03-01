import React from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { FeaturedCardWrapper } from "../../components/home/FeaturedCardWrapper";
import { FeaturedTabWrapper } from "../../components/home/FeaturedTabWrapper";
import { WelcomeView } from "../../components/home/WelcomeView";
import { Colors, FontVariants } from "../../styles";
import IonIcons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const HomeScreen = () => {
  const featuredcards = [
    { style: styles.bgcolor1, title: "sounds", num: "01" },
    { style: styles.bgcolor2, title: "logging", num: "02" },
    { style: styles.bgcolor3, title: "alarm", num: "03" },
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
                    />
                  );
                })}
              </ScrollView>
            </View>
          </View>
          <View>
            <View style={[styles.rowjustify]}>
              <Text style={styles.title}>Your alarms</Text>
              <Text style={styles.plustext}>+</Text>
            </View>
            <FeaturedTabWrapper
              icon={
                <IonIcons name="alarm-outline" color={Colors.white} size={20} />
              }
              text="07:15"
            />
            <FeaturedTabWrapper
              icon={
                <IonIcons name="alarm-outline" color={Colors.white} size={20} />
              }
              text="07:30"
            />
          </View>
          <View>
            <View style={[styles.rowjustify]}>
              <Text style={styles.title}>Your sounds</Text>
              <Text style={styles.plustext}>+</Text>
            </View>

            <FeaturedTabWrapper
              icon={
                <MaterialCommunityIcons
                  name="account-music-outline"
                  color={Colors.white}
                  size={20}
                />
              }
              text="water by a stream"
            />
            {/* <FeaturedTabWrapper
              icon={
                <MaterialCommunityIcons
                  name="account-music-outline"
                  color={Colors.white}
                  size={20}
                />
              }
              text="wind in the trees"
            /> */}
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
    marginBottom: 40,
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
