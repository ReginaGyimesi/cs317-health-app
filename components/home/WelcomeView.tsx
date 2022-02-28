import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { Colors, FontVariants } from "../../styles";

let currtime = new Date().getHours();
const nighttime = 5 >= currtime && currtime >= 18;
export const WelcomeView = () => {
  const morningtime = 5 < currtime && currtime < 12;
  const afternoontime = 12 <= currtime && currtime < 18;
  return (
    <View>
      <ImageBackground
        imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
        source={
          nighttime
            ? require("../../assets/images/bgdarkmoon.png")
            : require("../../assets/images/bglight.png")
        }
        style={styles.imgcontainer}
      >
        <View style={styles.textwrapper}>
          <Text style={[FontVariants.introThin, styles.text]}>
            {morningtime && "Good morning,"}
            {afternoontime && "Good afternoon,"}

            {nighttime && "Good evening,"}
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
    marginTop: 120,
  },
  text: {
    color: nighttime ? Colors.grey20 : Colors.grey60,
  },
  imgcontainer: {
    height: 224,
  },
});
