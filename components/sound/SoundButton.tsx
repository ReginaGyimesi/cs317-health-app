import { StyleSheet, View, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors, FontSizes } from "../../styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { Audio } from "expo-av";

type SoundButtonProps = {
  sound : Audio.Sound,
  soundPlaying : boolean,
  soundStatus : {}
};

export const SoundButton = ({ sound, soundPlaying, soundStatus }: SoundButtonProps) => {
    return (
        <View style={[styles.soundButton, styles.rainButton]}>
          <TouchableOpacity style={styles.playbackButton} onPress={() => toggleSound(sound)}>
            <Text style={styles.buttonText}>Rain</Text>
            {!soundPlaying && <MaterialCommunityIcons name="play" color={Colors.white} size={50} />}
            {soundPlaying && <MaterialCommunityIcons name="pause" color={Colors.white} size={50} />}
          </TouchableOpacity>
          <View style={styles.volumeButtons}>
            <TouchableOpacity style={[soundPlaying && styles.volumeButtonPlaying, styles.volumeButton]} onPress={() => changeVolume(sound, +0.1)}>{soundPlaying && <Text style={styles.volumeText}>+</Text>}</TouchableOpacity>
            <TouchableOpacity style={[soundPlaying && styles.volumeButtonPlaying, styles.volumeButton]} onPress={() => changeVolume(sound, -0.1)}>{soundPlaying && <Text style={styles.volumeText}>-</Text>}</TouchableOpacity>
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