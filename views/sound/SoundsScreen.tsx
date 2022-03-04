import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Colors, FontSizes, FontVariants, FontWeights } from "../../styles";
import { Audio } from 'expo-av';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

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
  const [rainSound, setRainSound] = useState(new Audio.Sound());
  const [rainSoundPlaying, setRainSoundPlaying] = useState(false);
  const [rainSoundStatus, setRainSoundStatus] = useState({'volume': 1});

  const [fireSound, setFireSound] = useState(new Audio.Sound());
  const [fireSoundPlaying, setFireSoundPlaying] = useState(false)
  const [fireSoundStatus, setFireSoundStatus] = useState({'volume': 1});

  const [waveSound, setWaveSound] = useState(new Audio.Sound());
  const [waveSoundPlaying, setWaveSoundPlaying] = useState(false)
  const [waveSoundStatus, setWaveSoundStatus] = useState({'volume': 1});

  const [forestSound, setForestSound] = useState(new Audio.Sound());
  const [forestSoundPlaying, setForestSoundPlaying] = useState(false)
  const [forestSoundStatus, setForestSoundStatus] = useState({'volume': 1});

  const [noiseSound, setNoiseSound] = useState(new Audio.Sound());
  const [noiseSoundPlaying, setNoiseSoundPlaying] = useState(false)
  const [noiseSoundStatus, setNoiseSoundStatus] = useState({'volume': 1});


  // Function to toggle audio playback
  async function toggleSound(audio : Audio.Sound) {
    switch(audio) {
      case rainSound: {
        if(!rainSoundPlaying) {
          await rainSound.loadAsync(require('../../assets/sounds/rain.mp3'));
          await rainSound.playAsync();
          rainSound.setIsLoopingAsync(true);
          setRainSoundPlaying(true);
        }
        else {
          await rainSound.stopAsync();
          await rainSound.unloadAsync();
          setRainSoundPlaying(false);
          break;
        }
        break;
      }
      case fireSound: {
        if(!fireSoundPlaying) {
          await fireSound.loadAsync(require('../../assets/sounds/fire.mp3'));
          await fireSound.playAsync();
          fireSound.setIsLoopingAsync(true);
          setFireSoundPlaying(true);
        }
        else {
          await fireSound.stopAsync();
          await fireSound.unloadAsync();
          setFireSoundPlaying(false);
        }
        break;
      }
      case waveSound: {
        if(!waveSoundPlaying) {
          await waveSound.loadAsync(require('../../assets/sounds/waves.mp3'));
          await waveSound.playAsync();
          waveSound.setIsLoopingAsync(true);
          setWaveSoundPlaying(true);
        }
        else {
          await waveSound.stopAsync();
          await waveSound.unloadAsync();
          setWaveSoundPlaying(false);
        }
        break;
      }
      case forestSound: {
        if(!forestSoundPlaying) {
          await forestSound.loadAsync(require('../../assets/sounds/forest.mp3'));
          await forestSound.playAsync();
          forestSound.setIsLoopingAsync(true);
          setForestSoundPlaying(true);
        }
        else {
          await forestSound.stopAsync();
          await forestSound.unloadAsync();
          setForestSoundPlaying(false);
        }
        break;
      }
      case noiseSound: {
        if(!noiseSoundPlaying) {
          await noiseSound.loadAsync(require('../../assets/sounds/noise.mp3'));
          await noiseSound.playAsync();
          noiseSound.setIsLoopingAsync(true);
          setNoiseSoundPlaying(true);
        }
        else {
          await noiseSound.stopAsync();
          await noiseSound.unloadAsync();
          setNoiseSoundPlaying(false);
        }
        break;
      }
    }
  }

  // Converts audio status information to dictionary format
  async function updateAudioStatus(audio : Audio.Sound) {
    let statusDict: any = {};
    await audio.getStatusAsync().then((data => {
      statusDict.volume = data.volume;
      switch(audio) {
        case rainSound: {
          setRainSoundStatus(statusDict);
          break;
        }
        case fireSound: {
          setFireSoundStatus(statusDict);
          break;
        }
        case waveSound: {
          setWaveSoundStatus(statusDict);
          break;
        }
        case forestSound: {
          setForestSoundStatus(statusDict);
          break;
        }
        case noiseSound: {
          setNoiseSoundStatus(statusDict);
          break;
        }
      }
    }));
  }

  // Changes volume of audio playback based on increment/decrement
  async function changeVolume(audio : Audio.Sound, change : number) {
    switch(audio) {
      case rainSound: {
        if(rainSoundStatus.volume + change >= 0 && rainSoundStatus.volume + change <= 1) {
          rainSound.setVolumeAsync(rainSoundStatus.volume + change);
          updateAudioStatus(rainSound);
        }
        break;
      }
      case fireSound: {
        if(fireSoundStatus.volume + change >= 0 && fireSoundStatus.volume + change <= 1) {
          fireSound.setVolumeAsync(fireSoundStatus.volume + change);
          updateAudioStatus(fireSound);
        }
        break;
      }
      case waveSound: {
        if(waveSoundStatus.volume + change >= 0 && waveSoundStatus.volume + change <= 1) {
          waveSound.setVolumeAsync(waveSoundStatus.volume + change);
          updateAudioStatus(waveSound);
        }
        break;
      }
      case forestSound: {
        if(forestSoundStatus.volume + change >= 0 && forestSoundStatus.volume + change <= 1) {
          forestSound.setVolumeAsync(forestSoundStatus.volume + change);
          updateAudioStatus(forestSound);
        }
        break;
      }
      case noiseSound: {
        if(noiseSoundStatus.volume + change >= 0 && noiseSoundStatus.volume + change <= 1) {
          noiseSound.setVolumeAsync(noiseSoundStatus.volume + change);
          updateAudioStatus(noiseSound);
        }
        break;
      }
    }
  }


  return (
    <View>
      <Text style={[FontVariants.headerBold, SoundStyles.header]}>Sleep Soundscape</Text>
      <Text style={[FontVariants.subtitleThin, SoundStyles.subtitle]}>Mix and match a relaxing soundscape to{"\n"}ease the mind into a restful night's sleep.</Text>
      <View style={SoundStyles.soundButtons}>

        <View style={[SoundStyles.soundButton, SoundStyles.rainButton]}>
          <TouchableOpacity style={SoundStyles.playbackButton} onPress={() => toggleSound(rainSound)}>
            <Text style={SoundStyles.buttonText}>Rain</Text>
            {!rainSoundPlaying && <MaterialCommunityIcons name="play" color={Colors.white} size={50} />}
            {rainSoundPlaying && <MaterialCommunityIcons name="pause" color={Colors.white} size={50} />}
          </TouchableOpacity>
          <View style={SoundStyles.volumeButtons}>
            <TouchableOpacity style={[rainSoundPlaying && SoundStyles.volumeButtonPlaying, SoundStyles.volumeButton]} onPress={() => changeVolume(rainSound, +0.1)}>{rainSoundPlaying && <Text style={SoundStyles.volumeText}>+</Text>}</TouchableOpacity>
            <TouchableOpacity style={[rainSoundPlaying && SoundStyles.volumeButtonPlaying, SoundStyles.volumeButton]} onPress={() => changeVolume(rainSound, -0.1)}>{rainSoundPlaying && <Text style={SoundStyles.volumeText}>-</Text>}</TouchableOpacity>
          </View>
        </View>

        <View style={[SoundStyles.soundButton, SoundStyles.fireButton]}>
          <TouchableOpacity style={SoundStyles.playbackButton} onPress={() => toggleSound(fireSound)}>
            <Text style={SoundStyles.buttonText}>Fire</Text>
            {!fireSoundPlaying && <MaterialCommunityIcons name="play" color={Colors.white} size={50} />}
            {fireSoundPlaying && <MaterialCommunityIcons name="pause" color={Colors.white} size={50} />}
          </TouchableOpacity>
          <View style={SoundStyles.volumeButtons}>
            <TouchableOpacity style={[fireSoundPlaying && SoundStyles.volumeButtonPlaying, SoundStyles.volumeButton]} onPress={() => changeVolume(fireSound, +0.1)}>{fireSoundPlaying && <Text style={SoundStyles.volumeText}>+</Text>}</TouchableOpacity>
            <TouchableOpacity style={[fireSoundPlaying && SoundStyles.volumeButtonPlaying, SoundStyles.volumeButton]} onPress={() => changeVolume(fireSound, -0.1)}>{fireSoundPlaying && <Text style={SoundStyles.volumeText}>-</Text>}</TouchableOpacity>
          </View>
        </View>

        <View style={[SoundStyles.soundButton, SoundStyles.waveButton]}>
          <TouchableOpacity style={SoundStyles.playbackButton} onPress={() => toggleSound(waveSound)}>
            <Text style={SoundStyles.buttonText}>Waves</Text>
            {!waveSoundPlaying && <MaterialCommunityIcons name="play" color={Colors.white} size={50} />}
            {waveSoundPlaying && <MaterialCommunityIcons name="pause" color={Colors.white} size={50} />}
          </TouchableOpacity>
          <View style={SoundStyles.volumeButtons}>
            <TouchableOpacity style={[waveSoundPlaying && SoundStyles.volumeButtonPlaying, SoundStyles.volumeButton]} onPress={() => changeVolume(waveSound, +0.1)}>{waveSoundPlaying && <Text style={SoundStyles.volumeText}>+</Text>}</TouchableOpacity>
            <TouchableOpacity style={[waveSoundPlaying && SoundStyles.volumeButtonPlaying, SoundStyles.volumeButton]} onPress={() => changeVolume(waveSound, -0.1)}>{waveSoundPlaying && <Text style={SoundStyles.volumeText}>-</Text>}</TouchableOpacity>
          </View>
        </View>

        <View style={[SoundStyles.soundButton, SoundStyles.forestButton]}>
          <TouchableOpacity style={SoundStyles.playbackButton} onPress={() => toggleSound(forestSound)}>
            <Text style={SoundStyles.buttonText}>Forest</Text>
            {!forestSoundPlaying && <MaterialCommunityIcons name="play" color={Colors.white} size={50} />}
            {forestSoundPlaying && <MaterialCommunityIcons name="pause" color={Colors.white} size={50} />}
          </TouchableOpacity>
          <View style={SoundStyles.volumeButtons}>
            <TouchableOpacity style={[forestSoundPlaying && SoundStyles.volumeButtonPlaying, SoundStyles.volumeButton]} onPress={() => changeVolume(forestSound, +0.1)}>{forestSoundPlaying && <Text style={SoundStyles.volumeText}>+</Text>}</TouchableOpacity>
            <TouchableOpacity style={[forestSoundPlaying && SoundStyles.volumeButtonPlaying, SoundStyles.volumeButton]} onPress={() => changeVolume(forestSound, -0.1)}>{forestSoundPlaying && <Text style={SoundStyles.volumeText}>-</Text>}</TouchableOpacity>
          </View>
        </View>

        <View style={[SoundStyles.soundButton, SoundStyles.noiseButton]}>
          <TouchableOpacity style={SoundStyles.playbackButton} onPress={() => toggleSound(noiseSound)}>
            <Text style={SoundStyles.buttonText}>Noise</Text>
            {!noiseSoundPlaying && <MaterialCommunityIcons name="play" color={Colors.white} size={50} />}
            {noiseSoundPlaying && <MaterialCommunityIcons name="pause" color={Colors.white} size={50} />}
          </TouchableOpacity>
          <View style={SoundStyles.volumeButtons}>
            <TouchableOpacity style={[noiseSoundPlaying && SoundStyles.volumeButtonPlaying, SoundStyles.volumeButton]} onPress={() => changeVolume(noiseSound, +0.1)}>{noiseSoundPlaying && <Text style={SoundStyles.volumeText}>+</Text>}</TouchableOpacity>
            <TouchableOpacity style={[noiseSoundPlaying && SoundStyles.volumeButtonPlaying, SoundStyles.volumeButton]} onPress={() => changeVolume(noiseSound, -0.1)}>{noiseSoundPlaying && <Text style={SoundStyles.volumeText}>-</Text>}</TouchableOpacity>
          </View>
        </View>

      </View>
    </View>
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
    width: 130,
    height: 120,
    margin: 10,
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
    height: 55,
    backgroundColor: Colors.grey10,
  },
  volumeButton: {
    opacity: 0.4,
  },
  volumeText: {
    color: Colors.white,
    textAlign: 'center',
    lineHeight: 50,
    fontSize: FontSizes.XL24,
    fontWeight: '700',
  },
  buttonText: {
    color: Colors.white,
    fontWeight: '700',
    padding: 15,
  },
  soundButtons: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    padding: 15,
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