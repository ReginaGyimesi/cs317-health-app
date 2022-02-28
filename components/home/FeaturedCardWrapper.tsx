import { StyleSheet, StyleProp, TextStyle, View, Text } from "react-native";
import { Colors, FontVariants } from "../../styles";

type CardProps = {
  style?: StyleProp<TextStyle>;
  title: String;
  number: String;
};

export const FeaturedCardWrapper = ({ style, title, number }: CardProps) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.header}>{number}</Text>
    </View>
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