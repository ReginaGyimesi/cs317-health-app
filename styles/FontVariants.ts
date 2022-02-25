import { StyleSheet } from "react-native";
import { Colors } from "./Colors";
import { FontSizes } from "./FontSizes";
import { FontWeights } from "./FontWeights";
import { LineHeights } from "./LineHeights";

export const FontVariants = StyleSheet.create({
  titleBold: {
    fontSize: FontSizes.XL24,
    fontFamily: FontWeights.Roboto700,
    lineHeight: LineHeights.ML26_6,
  },
  subtitleBold: {
    fontSize: FontSizes.L20,
    fontFamily: FontWeights.Roboto600,
    lineHeight: LineHeights.ML26_6,
  },
  headerThin: {
    fontSize: FontSizes.L20,
    fontFamily: FontWeights.Roboto300,
    color: Colors.white,
  },
  headerBold: {
    fontSize: FontSizes.ML18,
    fontFamily: FontWeights.Roboto600,
    color: Colors.white,
  },
  body: {
    fontSize: FontSizes.S14,
    fontFamily: FontWeights.Roboto400,
    color: Colors.grey40,
  },
});
