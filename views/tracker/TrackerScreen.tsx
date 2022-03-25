import React, { useState } from "react";
import { ScreenWrapper } from "../../components/common/ScreenWrapper.tsx";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import { Colors, FontSizes, FontVariants } from "../../styles";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const dummyData = require("../../assets/data/dummy.json");

type RadioProps = {
  title?: String;
  number: number;
  nav?: String;
  onPress?: () => void;
};
const screenWidth = Dimensions.get("window").width;

export const TrackerScreenNavName = "Tracker";
export const TrackerScreen = () => {
  const [hours, setData] = useState(dummyData.dailyHours);
  const [xAxis, setLabels] = useState(dummyData.dailyLabel);
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

  function daily() {
    //Calculate daily values from Async storage
    setData(dummyData.dailyHours);
    setLabels(dummyData.dailyLabel);
    setyAxis(dummyData.dailyAxis);
  }
  function weekly() {
    //Calculate daily values from Async storage
    setData(dummyData.weeklyHours);
    setLabels(dummyData.weeklyLabel);
    setyAxis(dummyData.weeklyAxis);
  }
  function monthly() {
    //Calculate daily values from Async storage
    setData(dummyData.monthlyHours);
    setLabels(dummyData.monthlyLabel);
    setyAxis(dummyData.monthlyAxis);
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
            { backgroundColor: id === 0 ? Colors.white  : "transparent" },
          ]}
          onPress={() => setHighlighted({ number: 0 })}
        >
          <Text style={[{ color: id === 0 ? Colors.secondaryPurple : Colors.white }]}>
            Weekly
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.radioButton,
            { backgroundColor: id === 1 ? Colors.white : "transparent" },
          ]}
          onPress={() => setHighlighted({ number: 1 })}
        >
          <Text style={[{ color: id === 1 ? Colors.secondaryPurple : Colors.white  }]}>
            Monthly
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.radioButton,
            { backgroundColor: id === 2 ? Colors.white: "transparent" },
          ]}
          onPress={() => setHighlighted({ number: 2 })}
        >
          <Text style={[{ color: id === 2 ? Colors.secondaryPurple : Colors.white }]}>
            Yearly
          </Text>
        </Pressable>
      </View>

      <View style={styles.graph}>
        <LineChart
          data={initial}
          width={screenWidth-30}
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
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Good job!</Text>
        <Text style={styles.cardText}>
          {hours.reduce((a: number, b: number) => a + b, 0)} hours of sleep has
          been logged this 
          {id==0? " week":""} 
          {id==1? " month":""}
          {id==2? " year":""} so far.
        </Text>
      </View>
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
  useShadowColorFromDataset: true, // optional
  propsForBackgroundLines: {
    stroke: Colors.grey10,
    strokeDasharray: 0,
  },
  propsForHorizontalLabels: {
    fill: Colors.grey10,
  },
  propsForVerticalLabels: {
    fill: Colors.grey10,
  },
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.grey30,
    height: 130,
    width: screenWidth - 50,
    borderRadius: 20,
    marginVertical: 20,
    marginHorizontal: 25,
    padding: 20,
  },
  cardTitle: {
    color:Colors.secondaryPurple,
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  cardText: {
    color: Colors.grey40,
    fontFamily: "Roboto",
    fontSize: 16,
  },
  graph:{

  },
  radio: {
    marginHorizontal: 10,
    backgroundColor: Colors.opBlue2,
    borderRadius: 40,
    width: screenWidth - 20,
    height: 35,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButton: {
    marginHorizontal: 5,
    padding: 2,
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
