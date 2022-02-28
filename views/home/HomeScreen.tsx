import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { FeaturedCardWrapper } from "../../components/home/FeaturedCardWrapper";
import { WelcomeView } from "../../components/home/WelcomeView";
import { Colors, FontVariants } from "../../styles";

export const HomeScreen = () => {
  const featuredcards = [
    { style: styles.bgcolor1, title: "sounds", num: "01" },
    { style: styles.bgcolor2, title: "tracking", num: "02" },
    { style: styles.bgcolor3, title: "alarm", num: "03" },
  ];
  return (
    <View style={styles.container}>
      <WelcomeView />
      <View style={styles.marginL30}>
        <View style={styles.marginT30}>
          <Text style={styles.title}>Most used</Text>
          <View style={styles.row}>
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
          </View>
        </View>
        <View style={styles.marginT30}>
          <Text style={styles.title}>Your alarms</Text>
        </View>
        <Text style={styles.title}>Favourite sounds</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    ...FontVariants.headerBold,
    color: Colors.grey20,
    marginBottom: 10,
  },
  marginL30: { marginLeft: 30 },
  marginT30: { marginTop: 30 },
  bgcolor1: { backgroundColor: Colors.opPurple },
  bgcolor2: { backgroundColor: Colors.opGreen, marginLeft: 15 },
  bgcolor3: { backgroundColor: Colors.opPink, marginLeft: 15 },
  row: {
    flexDirection: "row"
  },
});
