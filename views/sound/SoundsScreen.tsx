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
      icon: "rainy-outline",
    },
    {
      name: "Fire",
      path: require("../../assets/sounds/fire.mp3"),
      colour: Colors.opOrange,
      icon: "flame-outline",
    },
    {
      name: "Waves",
      path: require("../../assets/sounds/waves.mp3"),
      colour: Colors.opPurple,
      icon: "water-outline",
    },
    {
      name: "Forest",
      path: require("../../assets/sounds/forest.mp3"),
      colour: Colors.opGreen,
      icon: "leaf-outline",
    },
    {
      name: "Noise",
      path: require("../../assets/sounds/noise.mp3"),
      colour: Colors.opYellow,
      icon: "tv-outline",
    },
  ];

  return (
    <ScreenWrapper
      title="Sleep Soundscape"
      text="Mix and match a relaxing soundscape to ease the mind into a restful night's sleep."
    >
      <View style={styles.soundButtons}>
        {sounds.map((sound, idx) => {
          return (
            <SoundButton
              key={idx}
              sound={new Audio.Sound()}
              name={sound.name}
              path={sound.path}
              colour={sound.colour}
              icon={sound.icon}
            />
          );
        })}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  soundButtons: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 50,
    justifyContent: "space-evenly",
  },
});