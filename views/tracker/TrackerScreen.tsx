import React, { useEffect, useState } from "react";
import { ScreenWrapper } from "../../components/common/ScreenWrapper.tsx";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
  Button,
  Alert,
  GestureResponderEvent,
} from "react-native";
import { Colors, FontVariants } from "../../styles";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const dailyData = require('../../assets/data/daily.json');
const weeklyData = require('../../assets/data/weekly.json');
const monthlyData = require('../../assets/data/monthly.json');


type RadioProps = {
  title?: String;
  number: number;
  nav?: String;
  onPress?: () => void;
};
 const screenWidth = Dimensions.get("window").width;
 
export const TrackerScreenNavName = "Tracker";
export const TrackerScreen = () => {
 
  const [hours, setData] = useState(dailyData.hours);
  const [xAxis, setLabels] = useState(dailyData.labels);
  const [yAxis, setyAxis] = useState(15);
  const [id, setId] = useState(0);

  const initial = {
    labels: xAxis,
    datasets: [
      {
        data: hours,
      },
    ],
    legend: ["Total sleep time"], // optional
  };

  function valami() {
    setData(hours.map((element) => (element += Math.floor(Math.random() * 5))));
    setLabels(["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]);
  }

  function daily() {
    //Calculate daily values from Async storage
    setData([6, 6, 7, 8, 8, 8, 12]);
    setLabels(["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"]);
    setyAxis(15)
  }
  function weekly() {
    //Calculate daily values from Async storage
    setData([1, 2, 3, 4]);
    setLabels(["1st", "2nd", "3rd", "4th"]);
    setyAxis(30)
  }
  function monthly() {
    //Calculate daily values from Async storage
    setData([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    setLabels([
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]);
    setyAxis(15)

  }

  function setHighlighted({ number }: RadioProps) {
    setId(number);
    if (number === 0) {
      daily();
    }
    if (number === 1) {
      weekly();
    }
    if (number === 2) {
      monthly();
    }
  }

  return (
    <ScreenWrapper title="Sleep tracker" text="All your sleep sessions.">
      <View style={styles.radio}>
        <Pressable
          style={[
            styles.radioButton,
            { backgroundColor: id === 0 ? "white" :""},
          ]}
          onPress={() => setHighlighted({ number: 0 })}
        >
          <Text style={[{color: id === 0 ? "#3D45F6" : "white"}]}>Weekly</Text>
        </Pressable>
        <Pressable
          style={[
            styles.radioButton,
            { backgroundColor: id === 1 ? "white" : "" },
          ]}
          onPress={() => setHighlighted({ number: 1 })}
        >
          <Text style={[{color: id === 1 ? "#3D45F6" : "white"}]}>Monthly</Text>
        </Pressable>
        <Pressable
          style={[
            styles.radioButton,
            { backgroundColor: id === 2 ? "white" : "" },
          ]}
          onPress={() => setHighlighted({ number: 2 })}
        >
          <Text style={[{color: id === 2 ? "#3D45F6" : "white"}]}>Yearly</Text>
        </Pressable>
      </View>

      <LineChart
        data={initial}
        width={screenWidth}
        height={200}
        yAxisSuffix="h"
        withShadow={false}
        withInnerLines={true}
        withVerticalLines={false}
        withOuterLines={false}
        chartConfig={chartConfig}
        segments={5}
        fromNumber={yAxis}
        fromZero={true}
        
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
  radio: {
    marginHorizontal:10,
    backgroundColor: Colors.opBlue2,
    borderRadius: 40,
    width: screenWidth-20,
    height:35,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButton: {
    marginHorizontal:5,
    padding:2,
    borderRadius: 100,
    backgroundColor: "green",
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
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
