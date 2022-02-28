import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { WelcomeView } from "../../components/home/WelcomeView";
import { Colors, FontVariants } from "../../styles";

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <WelcomeView />
      <Text style={styles.title}>Most used</Text>
      <Text style={styles.title}>Your alarms</Text>
      <Text style={styles.title}>Favourite sounds</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    ...FontVariants.subtitleBold,
    color: Colors.grey20,
    margin: 30
  },
});
