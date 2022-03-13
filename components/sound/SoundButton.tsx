import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Colors, FontSizes, FontVariants } from "../../styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { toggleSound, changeVolume } from "../../utils/soundFunctions";
import { Audio } from "expo-av";
import { useState } from "react";

export type SoundButtonProps = {
  sound: Audio.Sound;
  name: string;
  path: any;
  colour: string;
};

export const SoundButton = ({
  sound,
  name,
  path,
  colour,
}: SoundButtonProps) => {
  const [playing, setPlaying] = useState(false);
  const [vol, setVolume] = useState(1);

  return (
    <View
      style={[
        styles.soundButton,
        { backgroundColor: colour, borderColor: colour },
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          setPlaying(!playing);
          toggleSound({
            sound: sound,
            isPlaying: playing,
            path: path,
          });
        }}
      >
        <Text style={styles.buttonText}>{name}</Text>
        <View style={styles.wrapper}>
          <MaterialCommunityIcons
            name={!playing ? "play" : "pause"}
            color={Colors.primaryPink}
            size={35}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.volumeButtons}>
        <TouchableOpacity
          onPress={() => {
            setVolume(vol + 0.1);
            changeVolume({ sound: sound, volume: vol });
          }}
        >
          {playing && <Text style={styles.volumeText}>+</Text>}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setVolume(vol - 0.1);
            changeVolume({ sound: sound, volume: vol });
          }}
        >
          {playing && <Text style={styles.volumeText}>-</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  soundButton: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    width: 120,
    height: 120,
    margin: 5,
    borderRadius: 20,
    overflow: "hidden",
    padding: 5,
  },
  volumeText: {
    color: Colors.primaryPink,
    textAlign: "center",
    fontSize: FontSizes.XXL28,
    fontWeight: "700",
  },
  buttonText: {
    ...FontVariants.headerBold,
    color: Colors.grey40,
    fontWeight: "700",
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 20,
  },
  volumeButtons: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
  },
  wrapper: {
    borderRadius: 50,
    backgroundColor: Colors.opGrey,
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
});
