import React, { useState } from "react";
import { ScreenWrapper } from "../../components/common/ScreenWrapper.tsx";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { Colors, FontVariants } from "../../styles";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";


const screenWidth = Dimensions.get("window").width;
const data = {
  labels: ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"],
  datasets: [
    {
      data: [6, 6, 7, 8, 8, 8,12],
    },
  ],
  legend: ["Total sleep time"], // optional
};

const uniqueSegments = () => {
  return new Set(data.datasets[0].data).size;
};

export const TrackerScreenNavName = "Tracker";
export const TrackerScreen = () => {

  return (
    <ScreenWrapper title="Sleep tracker" text="All your sleep sessions." >
      <LineChart
        data={data}
        width={screenWidth}
        height={300}
        yAxisSuffix="h"
        withShadow={false}
        withInnerLines={true}
        withVerticalLines={false}
        withOuterLines={false}
        chartConfig={chartConfig}
        segments={uniqueSegments()}
      />
    </ScreenWrapper>
  );
};

const chartConfig = {
  decimalPlaces: 0,
  backgroundGradientFrom: Colors.primaryPurple,
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: Colors.primaryPurple,
  backgroundGradientToOpacity: 1,
  color: () => Colors.primaryOrange,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
  propsForBackgroundLines: {
    stroke: Colors.grey10,
    strokeDasharray: {},
  },
  propsForHorizontalLabels: {
    fill: Colors.grey10,
  },
  propsForVerticalLabels: {
    fill: Colors.grey10,
  },
};

const styles = StyleSheet.create({
  container: {},
  title: {
    ...FontVariants.headerBold,
    color: Colors.grey20,
    marginBottom: 10,
    marginLeft: 30,
  },
  basemargin: {
    marginBottom: 40,
  },
  bgcolor1: { backgroundColor: Colors.opPurple, marginLeft: 30 },
  bgcolor2: { backgroundColor: Colors.opGreen, marginLeft: 15 },
  bgcolor3: { backgroundColor: Colors.opPink, marginLeft: 15, marginRight: 20 },
  row: {
    flexDirection: "row",
  },
  rowjustify: {
    flexDirection: "row",
    marginTop: 30,
    marginRight: 30,
    justifyContent: "space-between",
  },
  plustext: {
    ...FontVariants.headerBold,
    color: Colors.grey20,
  },
});
