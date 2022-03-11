import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Colors, FontSizes } from "../../styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { toggleSound, changeVolume } from "../../utils/soundFunctions";
import { Audio } from "expo-av";
import { useState } from "react";

export type SoundButtonProps = {
  sound: Audio.Sound;
  name: string;
  volume: number;
  path: any;
  colour: string;
};

export const SoundButton = ({
  sound,
  name,
  volume,
  path,
  colour,
}: SoundButtonProps) => {
  const [playing, setPlaying] = useState(false);

  const background = function() {
    return {
      backgroundColor: colour,
      borderColor: colour,
    }
  }

  return (
    <View style={[styles.soundButton, background()]}>
      <TouchableOpacity
        style={styles.playbackButton}
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
        <MaterialCommunityIcons
          name={!playing ? "play" : "pause"}
          color={Colors.white}
          size={50}
        />
      </TouchableOpacity>
      <View style={styles.volumeButtons}>
        <TouchableOpacity
          style={[playing && styles.volumeButtonPlaying, styles.volumeButton]}
          onPress={() =>
            changeVolume({ sound: sound, volume: volume, change: +0.1 })
          }
        >
          {playing && <Text style={styles.volumeText}>+</Text>}
        </TouchableOpacity>
        <TouchableOpacity
          style={[playing && styles.volumeButtonPlaying, styles.volumeButton]}
          onPress={() =>
            changeVolume({ sound: sound, volume: volume, change: -0.1 })
          }
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
    height: 90,
    margin: 5,
    borderRadius: 10,
    borderWidth: 5,
    overflow: "hidden",
    opacity: 0.7,
  },
  Rain: {
    backgroundColor: Colors.opBlue,
    borderColor: Colors.opBlue,
  },
  volumeText: {
    color: Colors.white,
    textAlign: "center",
    fontSize: FontSizes.XL24,
    fontWeight: "700",
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "700",
  },
  playbackButton: {
    flex: 2,
    display: "flex",
    justifyContent: "space-between",
  },
  volumeButtons: {
    flex: 1,
    display: "flex",
  },
  volumeButtonPlaying: {
    height: 45,
    backgroundColor: Colors.grey10,
  },
  volumeButton: {
    opacity: 0.4,
  },
});