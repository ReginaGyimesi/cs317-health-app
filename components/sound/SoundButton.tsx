import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { Colors, FontSizes } from "../../styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { Audio } from "expo-av";
import {toggleSound, updateStatus, changeVolume, SoundButtonProps} from "../../utils/soundFunctions";

export const SoundButton = (audio : SoundButtonProps) => {
    return (
        <View style={[styles.soundButton, styles.rainButton]}>
          <TouchableOpacity style={styles.playbackButton} onPress={() => toggleSound(audio)}>
            <Text style={styles.buttonText}>{audio.name}</Text>
            {!audio.isPlaying && <MaterialCommunityIcons name="play" color={Colors.white} size={50} />}
            {audio.isPlaying && <MaterialCommunityIcons name="pause" color={Colors.white} size={50} />}
          </TouchableOpacity>
          <View style={styles.volumeButtons}>
            <TouchableOpacity style={[audio.isPlaying && styles.volumeButtonPlaying, styles.volumeButton]} onPress={() => changeVolume(audio, +0.1)}>{audio.isPlaying && <Text style={styles.volumeText}>+</Text>}</TouchableOpacity>
            <TouchableOpacity style={[audio.isPlaying && styles.volumeButtonPlaying, styles.volumeButton]} onPress={() => changeVolume(audio, -0.1)}>{audio.isPlaying && <Text style={styles.volumeText}>-</Text>}</TouchableOpacity>
          </View>
        </View>
    );
};

const styles = StyleSheet.create({
  soundButton: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: 120,
    height: 90,
    margin: 5,
    borderRadius: 10,
    borderWidth: 5,
    overflow: 'hidden',
    opacity: 0.7,
  },
  rainButton: {
    backgroundColor: Colors.opBlue,
    borderColor: Colors.opBlue
  },
  volumeText: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: FontSizes.XL24,
    fontWeight: '700',
  },
  buttonText: {
    color: Colors.white,
    fontWeight: '700',
  },
  playbackButton: {
    flex: 2,
    display: 'flex',
    justifyContent: 'space-between',
  },
  volumeButtons: {
    flex: 1,
    display: 'flex',
  },
  volumeButtonPlaying: {
    height: 45,
    backgroundColor: Colors.grey10,
  },
  volumeButton: {
    opacity: 0.4,
  },
});