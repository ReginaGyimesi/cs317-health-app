import React from "react";
import { Text, Image, View, StyleSheet } from "react-native";
import { ScreenWrapper } from "../../components/common/ScreenWrapper.tsx";
import { FontVariants, Colors } from "../../styles";
import { ModalWrapper } from "../../components/common/Modal";

export const ProfileScreenNavName = "Me";
export const ProfileScreen = () => {
  return (
    <ScreenWrapper title="Hello, Bob" text="">
      <Image
        source={require("../../assets/images/semicirclereversed.png")}
        style={styles.imgcontainer}
      />
      <View style={styles.container}>
        <View style={{ marginBottom: 20}}>
          <Text style={styles.title}>Account</Text>
          <Text style={styles.text}>Bob Test</Text>
          <Text style={styles.text}>test@test.com</Text>
        </View>
        <View>
          <Text style={[styles.title, { marginTop: 10 }]}>Other</Text>
          <Text style={styles.text}>Subscription</Text>
          <Text style={styles.text}>Terms and conditions</Text>
          <Text style={styles.text}>Privacy policy</Text>
          <Text style={[styles.text, { color: Colors.dangerRed }]}>
            Delete account
          </Text>
        </View>
        <ModalWrapper title={"Log out"}>
        <View style={styles.capsule}>
          <Text style={{...FontVariants.headerThin, color: Colors.white,}}>Log out</Text>
        </View>
        </ModalWrapper>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  imgcontainer: {
    width: "100%",
    position: "absolute",
    top: 0,
    zIndex: -1,
  },
  container: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 70,
  },
  title: {
    ...FontVariants.headerBold,
    color: Colors.grey20,
  },
  text: {
    ...FontVariants.headerThin,
    color: Colors.white,
    marginTop: 10,
  },
  capsule: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.grey20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    padding: 2,
    marginTop: 40,
  }
});
