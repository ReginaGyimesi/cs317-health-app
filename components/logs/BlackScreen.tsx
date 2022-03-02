import { StyleSheet, View } from "react-native";
import { Colors } from "../../styles";

export const BlackScreen = () => {
  return (
    <View style={styles.container}>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    height: "100%",
    width: "100%"
  }
});