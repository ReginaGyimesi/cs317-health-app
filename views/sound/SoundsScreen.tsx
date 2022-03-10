import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Colors, FontSizes, FontVariants, FontWeights } from "../../styles";
import { Audio } from 'expo-av';
import { useNavigation } from "@react-navigation/native";
import { ScreenWrapper } from "../../components/common/ScreenWrapper.tsx";
import { SoundButton } from "../../components/sound/SoundButton";

const ENABLE_BACKGROUND_AUDIO = {
  interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
  shouldDuckAndroid: true,
  staysActiveInBackground: true,
};

export const SoundsScreenNavName = "Sounds";
export const SoundsScreen = () => {
  const navigation = useNavigation();

  Audio.setAudioModeAsync(ENABLE_BACKGROUND_AUDIO);
  
  // Variable definitions for audio
  const [rainSound, setRainSound] = useState({'sound': new Audio.Sound, 'name': 'Rain', 'volume': 1, 'isPlaying': false, 'path': require('../../assets/sounds/rain.mp3')});
  const [fireSound, setFireSound] = useState({'sound': new Audio.Sound, 'name': 'Fire',  'volume': 1, 'isPlaying': false, 'path': require('../../assets/sounds/fire.mp3')});
  const [waveSound, setWaveSound] = useState({'sound': new Audio.Sound, 'name': 'Waves',  'volume': 1, 'isPlaying': false, 'path': require('../../assets/sounds/waves.mp3')});
  const [forestSound, setForestSound] = useState({'sound': new Audio.Sound, 'name': 'Forest',  'volume': 1, 'isPlaying': false, 'path': require('../../assets/sounds/forest.mp3')});
  const [noiseSound, setNoiseSound] = useState({'sound': new Audio.Sound, 'name': 'Noise',  'volume': 1, 'isPlaying': false, 'path': require('../../assets/sounds/noise.mp3')});

  useEffect(() => {}, [rainSound, fireSound, waveSound, forestSound, noiseSound]);

  return (
    <ScreenWrapper title="Sleep Soundscape" text="Mix and match a relaxing soundscape to ease the mind into a restful night's sleep.">
      <View style={SoundStyles.soundButtons}>
        <SoundButton sound={rainSound.sound} name={rainSound.name} volume={rainSound.volume} isPlaying={rainSound.isPlaying} path={rainSound.path}></SoundButton>
        <SoundButton sound={fireSound.sound} name={fireSound.name}  volume={fireSound.volume} isPlaying={fireSound.isPlaying} path={fireSound.path}></SoundButton>
        <SoundButton sound={waveSound.sound} name={waveSound.name}  volume={waveSound.volume} isPlaying={waveSound.isPlaying} path={waveSound.path}></SoundButton>
        <SoundButton sound={forestSound.sound} name={forestSound.name}  volume={forestSound.volume} isPlaying={forestSound.isPlaying} path={forestSound.path}></SoundButton>
        <SoundButton sound={noiseSound.sound} name={noiseSound.name}  volume={noiseSound.volume} isPlaying={noiseSound.isPlaying} path={noiseSound.path}></SoundButton>
      </View>
    </ScreenWrapper>
  );
};

const SoundStyles = StyleSheet.create({
  header: {
    paddingLeft: 20,
    paddingTop: 50,
  },
  subtitle: {
    paddingLeft: 20,
    paddingTop: 10,
  },
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
  soundButtons: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  rainButton: {
    backgroundColor: Colors.opBlue,
    borderColor: Colors.opBlue
  },
  fireButton: {
    backgroundColor: Colors.dangerRed,
    borderColor: Colors.dangerRed,
  },
  waveButton: {
    backgroundColor: Colors.opPurple,
    borderColor: Colors.opPurple,
  },
  forestButton: {
    backgroundColor: Colors.acceptGreen,
    borderColor: Colors.acceptGreen,
  },
  noiseButton: {
    backgroundColor: Colors.warningYellow,
    borderColor: Colors.warningYellow,
  },
});

function setRainSound(audio: { sound: Audio.Sound; volume: number; isPlaying: boolean; }) {
  throw new Error("Function not implemented.");
}
