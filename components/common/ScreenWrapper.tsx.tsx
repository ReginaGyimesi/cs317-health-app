import { StyleSheet, Text, View } from "react-native";
import { Colors, FontVariants } from "../../styles";
import { BackToHomeButton } from "./BackToHomeButton";

type Props = {
  title: String;
  text: String;
  children: any;
};

export const ScreenWrapper = ({ title, text, children }: Props) => {
  return (
    <View style={[styles.container]}>
      <BackToHomeButton />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 30,
    marginTop: 40,
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
