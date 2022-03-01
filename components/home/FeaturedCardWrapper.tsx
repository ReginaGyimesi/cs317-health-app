import { useNavigation } from "@react-navigation/native";
import { StyleSheet, StyleProp, TextStyle, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors, FontVariants } from "../../styles";

type CardProps = {
  style?: StyleProp<TextStyle>;
  title: String;
  number: String;
  nav: String;
  onPress?: () => void;
};

export const FeaturedCardWrapper = ({ style, title, number, onPress }: CardProps) => {

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.header}>{number}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 130,
    width: 130,
    borderRadius: 20,
    padding: 10,
  },
  text: {
    ...FontVariants.headerBold,
    color: Colors.grey40,
  },
  header: {
    ...FontVariants.headerLarge,
    position: "absolute",
    bottom: 0,
    paddingLeft: 10,
    paddingBottom: 10,
    color: Colors.primaryPink,
  },
});
