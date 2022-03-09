import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Colors, FontSizes, FontVariants, FontWeights } from "../../styles";
import { Audio } from 'expo-av';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { ScreenWrapper } from "../../components/common/ScreenWrapper.tsx";

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
  const [playCount, setPlayCount] = useState(0);
  const [rainSound, setRainSound] = useState({'sound': new Audio.Sound, 'volume': 1, 'isPlaying': false, 'path': require('../../assets/sounds/rain.mp3')});
  const [fireSound, setFireSound] = useState({'sound': new Audio.Sound, 'volume': 1, 'isPlaying': false, 'path': require('../../assets/sounds/fire.mp3')});
  const [waveSound, setWaveSound] = useState({'sound': new Audio.Sound, 'volume': 1, 'isPlaying': false, 'path': require('../../assets/sounds/waves.mp3')});
  const [forestSound, setForestSound] = useState({'sound': new Audio.Sound, 'volume': 1, 'isPlaying': false, 'path': require('../../assets/sounds/forest.mp3')});
  const [noiseSound, setNoiseSound] = useState({'sound': new Audio.Sound, 'volume': 1, 'isPlaying': false, 'path': require('../../assets/sounds/noise.mp3')});

  useEffect(() => {}, [rainSound, fireSound, waveSound, forestSound, noiseSound]);

  // Function to toggle audio playback
  async function toggleSound(audio: { sound: Audio.Sound, volume: number, isPlaying: boolean, path: any }) {
    if(audio.isPlaying === false) {
      await audio.sound.loadAsync(audio.path);
      await audio.sound.playAsync();
      audio.sound.setIsLoopingAsync(true);
      audio.isPlaying = true;
      setPlayCount(playCount+1);
    }
    else {
      await audio.sound.stopAsync();
      await audio.sound.unloadAsync();
      audio.isPlaying = false;
      setPlayCount(playCount-1)
    }
  }

  // Updates local volume variable
  async function updateStatus(audio: { sound: Audio.Sound, volume: number, isPlaying: boolean, path: any }) {
    await audio.sound.getStatusAsync().then((data => {
      audio.volume = data.volume;
    }));
  }

  // Changes volume of audio playback based on increment/decrement
  async function changeVolume(audio: { sound: Audio.Sound, volume: number, isPlaying: boolean, path: any }, change : number) {
    if(audio.volume + change >= 0 && audio.volume + change <= 1) {
      audio.sound.setVolumeAsync(audio.volume + change);
      updateStatus(audio);
    }
  }

  return (
    <ScreenWrapper title="Sleep Soundscape" text="Mix and match a relaxing soundscape to ease the mind into a restful night's sleep.">
      <View style={SoundStyles.soundButtons}>

        <View style={[SoundStyles.soundButton, SoundStyles.rainButton]}>
          <TouchableOpacity style={SoundStyles.playbackButton} onPress={() => toggleSound(rainSound)}>
            <Text style={SoundStyles.buttonText}>Rain</Text>
            {!rainSound.isPlaying && <MaterialCommunityIcons name="play" color={Colors.white} size={50} />}
            {rainSound.isPlaying && <MaterialCommunityIcons name="pause" color={Colors.white} size={50} />}
          </TouchableOpacity>
          <View style={SoundStyles.volumeButtons}>
            <TouchableOpacity style={[rainSound.isPlaying && SoundStyles.volumeButtonPlaying, SoundStyles.volumeButton]} onPress={() => changeVolume(rainSound, +0.1)}>{rainSound.isPlaying && <Text style={SoundStyles.volumeText}>+</Text>}</TouchableOpacity>
            <TouchableOpacity style={[rainSound.isPlaying && SoundStyles.volumeButtonPlaying, SoundStyles.volumeButton]} onPress={() => changeVolume(rainSound, -0.1)}>{rainSound.isPlaying && <Text style={SoundStyles.volumeText}>-</Text>}</TouchableOpacity>
          </View>
        </View>

        <View style={[SoundStyles.soundButton, SoundStyles.fireButton]}>
          <TouchableOpacity style={SoundStyles.playbackButton} onPress={() => toggleSound(fireSound)}>
            <Text style={SoundStyles.buttonText}>Fire</Text>
            {!fireSound.isPlaying && <MaterialCommunityIcons name="play" color={Colors.white} size={50} />}
            {fireSound.isPlaying && <MaterialCommunityIcons name="pause" color={Colors.white} size={50} />}
          </TouchableOpacity>
          <View style={SoundStyles.volumeButtons}>
            <TouchableOpacity style={[fireSound.isPlaying && SoundStyles.volumeButtonPlaying, SoundStyles.volumeButton]} onPress={() => changeVolume(fireSound, +0.1)}>{fireSound.isPlaying && <Text style={SoundStyles.volumeText}>+</Text>}</TouchableOpacity>
            <TouchableOpacity style={[fireSound.isPlaying && SoundStyles.volumeButtonPlaying, SoundStyles.volumeButton]} onPress={() => changeVolume(fireSound, -0.1)}>{fireSound.isPlaying && <Text style={SoundStyles.volumeText}>-</Text>}</TouchableOpacity>
          </View>
        </View>

        <View style={[SoundStyles.soundButton, SoundStyles.waveButton]}>
          <TouchableOpacity style={SoundStyles.playbackButton} onPress={() => toggleSound(waveSound)}>
            <Text style={SoundStyles.buttonText}>Waves</Text>
            {!waveSound.isPlaying && <MaterialCommunityIcons name="play" color={Colors.white} size={50} />}
            {waveSound.isPlaying && <MaterialCommunityIcons name="pause" color={Colors.white} size={50} />}
          </TouchableOpacity>
          <View style={SoundStyles.volumeButtons}>
            <TouchableOpacity style={[waveSound.isPlaying && SoundStyles.volumeButtonPlaying, SoundStyles.volumeButton]} onPress={() => changeVolume(waveSound, +0.1)}>{waveSound.isPlaying && <Text style={SoundStyles.volumeText}>+</Text>}</TouchableOpacity>
            <TouchableOpacity style={[waveSound.isPlaying && SoundStyles.volumeButtonPlaying, SoundStyles.volumeButton]} onPress={() => changeVolume(waveSound, -0.1)}>{waveSound.isPlaying && <Text style={SoundStyles.volumeText}>-</Text>}</TouchableOpacity>
          </View>
        </View>

        <View style={[SoundStyles.soundButton, SoundStyles.forestButton]}>
          <TouchableOpacity style={SoundStyles.playbackButton} onPress={() => toggleSound(forestSound)}>
            <Text style={SoundStyles.buttonText}>Forest</Text>
            {!forestSound.isPlaying && <MaterialCommunityIcons name="play" color={Colors.white} size={50} />}
            {forestSound.isPlaying && <MaterialCommunityIcons name="pause" color={Colors.white} size={50} />}
          </TouchableOpacity>
          <View style={SoundStyles.volumeButtons}>
            <TouchableOpacity style={[forestSound.isPlaying && SoundStyles.volumeButtonPlaying, SoundStyles.volumeButton]} onPress={() => changeVolume(forestSound, +0.1)}>{forestSound.isPlaying && <Text style={SoundStyles.volumeText}>+</Text>}</TouchableOpacity>
            <TouchableOpacity style={[forestSound.isPlaying && SoundStyles.volumeButtonPlaying, SoundStyles.volumeButton]} onPress={() => changeVolume(forestSound, -0.1)}>{forestSound.isPlaying && <Text style={SoundStyles.volumeText}>-</Text>}</TouchableOpacity>
          </View>
        </View>

        <View style={[SoundStyles.soundButton, SoundStyles.noiseButton]}>
          <TouchableOpacity style={SoundStyles.playbackButton} onPress={() => toggleSound(noiseSound)}>
            <Text style={SoundStyles.buttonText}>Noise</Text>
            {!noiseSound.isPlaying && <MaterialCommunityIcons name="play" color={Colors.white} size={50} />}
            {noiseSound.isPlaying && <MaterialCommunityIcons name="pause" color={Colors.white} size={50} />}
          </TouchableOpacity>
          <View style={SoundStyles.volumeButtons}>
            <TouchableOpacity style={[noiseSound.isPlaying && SoundStyles.volumeButtonPlaying, SoundStyles.volumeButton]} onPress={() => changeVolume(noiseSound, +0.1)}>{noiseSound.isPlaying && <Text style={SoundStyles.volumeText}>+</Text>}</TouchableOpacity>
            <TouchableOpacity style={[noiseSound.isPlaying && SoundStyles.volumeButtonPlaying, SoundStyles.volumeButton]} onPress={() => changeVolume(noiseSound, -0.1)}>{noiseSound.isPlaying && <Text style={SoundStyles.volumeText}>-</Text>}</TouchableOpacity>
          </View>
        </View>

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
