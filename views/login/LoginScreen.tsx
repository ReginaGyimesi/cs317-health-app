import React, { useState } from "react";
import {
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AuthContext } from "../../App";
import { Colors, FontSizes } from "../../styles";
import details from "../../utils/details.json";
import Toast from "react-native-root-toast";

export const LoginScreenNavName = "Login";
export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const showToast = () => {
    Toast.show("Invalid credentials", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM + 8,
      delay: 0,
      animation: true,
      hideOnPress: true,
      backgroundColor: Colors.dangerRed,
    });
  };

  const { signIn } = React.useContext(AuthContext);

  const checkLogin = async () => {
    for (let i = 0; i < details.length; i++) {
      if (details[i].email === email && details[i].password === password) {
        signIn({ email, password });
        return;
      }
    }
    showToast();
  };

  return (
    <SafeAreaView>
      <View>
        <View style={styles.headerView}>
          <Text style={styles.header}>Moon &#8226; rise</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={[styles.label, { backgroundColor: Colors.primaryPurple }]}
          >
            email
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Your email"
          onChangeText={(email) => setEmail(email)}
          placeholderTextColor={Colors.grey30}
          value={email}
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <ImageBackground
          source={require("../../assets/images/semicircle.png")}
          style={{ width: "100%", height: 800, marginTop: -15 }}
        >
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <Text style={[styles.label, { backgroundColor: Colors.bgPurple }]}>
              password
            </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Your password"
            onChangeText={(password) => setPassword(password)}
            placeholderTextColor={Colors.grey20}
            value={password}
            secureTextEntry={true}
          />
          <View style={styles.loginwrapper}>
            <Pressable
              style={styles.loginView}
              onPress={() => {
                checkLogin();
              }}
              accessibilityLabel="Login Button"
            >
              <Text style={styles.loginText}>Login</Text>
            </Pressable>
          </View>
          <Text
            style={{ ...styles.signUp, marginTop: 55, color: Colors.grey20 }}
          >
            Don't have an account yet?
          </Text>
          <Text style={{ ...styles.signUp, color: Colors.secondaryPurple }}>
            {" "}
            Create one here
          </Text>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  label: {
    color: Colors.grey20,
    flexShrink: 1,
    marginBottom: -10,
    left: 55,
    zIndex: 1,
    paddingLeft: 4,
    paddingRight: 4,
  },
  loginText: {
    color: Colors.grey20,
    padding: 5,
  },
  signUp: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  textContainer: {
    flexDirection: "row",
  },
  loginwrapper: {
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  loginView: {
    marginTop: "5%",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.grey20,
    width: "20%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  headerView: {
    paddingTop: 120,
    paddingBottom: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginLeft: "10%",
    marginRight: "10%",
    marginBottom: "5%",
    position: "relative",
    padding: 10,
    paddingLeft: 20,
    height: "auto",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.grey20,
    color: Colors.grey10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: FontSizes.L20,
    color: "white",
    marginTop: 25,
    padding: 8,
    borderRadius: 10,
    width: 120,
  },
  header: {
    color: "white",
    fontSize: 36,
    textAlign: "center",
    fontWeight: "600",
  },
});
