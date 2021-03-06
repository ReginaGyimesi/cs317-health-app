import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { Colors, FontVariants } from "../../styles";
import { BackToHomeButton } from "./BackToHomeButton";

type Props = {
  title: String;
  text: String;
  children: any;
};

export const ScreenWrapper = ({ title, text, children }: Props) => {
  return (
    <ScrollView>
      <View style={[styles.container]}>
        <BackToHomeButton />
        <Animatable.Text animation={"fadeIn"} style={styles.title}>
          {title}
        </Animatable.Text>
        <Animatable.Text style={styles.text}>{text}</Animatable.Text>
      </View>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 30,
    marginTop: 50,
  },
  title: {
    ...FontVariants.titleBold,
    color: Colors.grey20,
    marginTop: 30,
  },
  text: {
    ...FontVariants.body,
    marginTop: 10,
  },
});
