import { Audio } from "expo-av";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ScreenWrapper } from "../../components/common/ScreenWrapper.tsx";
import { SoundButton } from "../../components/sound/SoundButton";
import { Colors, FontSizes } from "../../styles";

const ENABLE_BACKGROUND_AUDIO = {
  interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
  shouldDuckAndroid: true,
  staysActiveInBackground: true,
};

export const SoundsScreenNavName = "Sounds";
export const SoundsScreen = () => {
  Audio.setAudioModeAsync(ENABLE_BACKGROUND_AUDIO);

  const sounds = [
    {
      name: "Rain",
      path: require("../../assets/sounds/rain.mp3"),
      colour: Colors.opBlue,
    },
    {
      name: "Fire",
      path: require("../../assets/sounds/fire.mp3"),
      colour: Colors.dangerRed,
    },
    {
      name: "Waves",
      path: require("../../assets/sounds/waves.mp3"),
      colour: Colors.opPurple,
    },
    {
      name: "Forest",
      path: require("../../assets/sounds/forest.mp3"),
      colour: Colors.acceptGreen,
    },
    {
      name: "Noise",
      path: require("../../assets/sounds/noise.mp3"),
      colour: Colors.warningYellow,
    },
  ];

  return (
    <ScreenWrapper
      title="Sleep Soundscape"
      text="Mix and match a relaxing soundscape to ease the mind into a restful night's sleep."
    >
      <View style={SoundStyles.soundButtons}>
        {sounds.map((sound, idx) => {
          return (
            <SoundButton
              key={idx}
              sound={new Audio.Sound()}
              name={sound.name}
              volume={1}
              path={sound.path}
              colour={sound.colour}
            />
          );
        })}
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
  soundButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  rainButton: {
    backgroundColor: Colors.opBlue,
    borderColor: Colors.opBlue,
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

function setRainSound(audio: {
  sound: Audio.Sound;
  volume: number;
  isPlaying: boolean;
}) {
  throw new Error("Function not implemented.");
}
