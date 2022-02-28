import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { Colors, FontVariants } from "../../styles";

export const WelcomeView = () => {
  return (
    <View>
      <ImageBackground
        imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
        source={require("../../assets/images/bgdark.png")}
        style={styles.imgcontainer}
      >
        <View style={styles.textwrapper}>
          <Text style={[FontVariants.introThin, styles.text]}>
            Good evening,
          </Text>
          <Text
            style={[FontVariants.introBold, styles.text, { paddingTop: 8 }]}
          >
            Bob
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  textwrapper: {
    margin: 30,
    marginTop: 100,
  },
  text: {
    color: Colors.grey20,
  },
  imgcontainer: {
    height: 200,
  },
});
