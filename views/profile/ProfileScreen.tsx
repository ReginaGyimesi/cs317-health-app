import React from "react";
import { Text, Image, View, StyleSheet } from "react-native";
import { ScreenWrapper } from "../../components/common/ScreenWrapper.tsx";
import { FontVariants, Colors } from "../../styles";
import { ModalWrapper } from "../../components/common/Modal";
import { AuthContext } from "../../App";

export const ProfileScreenNavName = "Me";
export const ProfileScreen = () => {
  const { signOut } = React.useContext(AuthContext);
  return (
    <ScreenWrapper title="Hello, Admin" text="">
      <Image
        source={require("../../assets/images/semicirclereversed.png")}
        style={styles.imgcontainer}
      />
      <View style={styles.container}>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.title}>Account</Text>
          <Text style={styles.text}>Name</Text>
          <Text style={styles.text}>Email</Text>
        </View>
        <View>
          <Text style={[styles.title, { marginTop: 10 }]}>Other</Text>
          <Text style={styles.text}>Subscription</Text>
          <Text style={styles.text}>Terms and conditions</Text>
          <Text style={styles.text}>Privacy policy</Text>
          <ModalWrapper
            title={"Delete account"}
            text={
              "Are you sure you want to delete your account? You will lose all your data."
            }
            _onClick={signOut}
          >
            <Text style={[styles.text, { color: Colors.dangerRed }]}>
              Delete account
            </Text>
          </ModalWrapper>
        </View>
        <ModalWrapper
          title={"Log out"}
          text={"Are you sure you want to log out?"}
          _onClick={signOut}
        >
          <View style={styles.capsule}>
            <Text style={{ ...FontVariants.headerThin, color: Colors.white }}>
              Log out
            </Text>
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
    alignSelf: "center",
    width: 80,
    padding: 2,
    marginTop: 40,
  },
});
