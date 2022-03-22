import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from "expo-av";
import { AVPlaybackSource } from "expo-av/build/AV.types";

export type SoundProps = {
  isPlaying: boolean;
  sound: Audio.Sound;
  path: AVPlaybackSource;
  name: string;
  icon: string;
};

// Function to toggle audio playback
export async function toggleSound({ isPlaying, sound, path, name, icon }: SoundProps) {
  if (!isPlaying) {
    await sound.loadAsync(path);
    await sound.playAsync();
    sound.setIsLoopingAsync(true);
    saveActiveSound({name, icon});
  } else {
    await sound.stopAsync();
    await sound.unloadAsync();
    deleteActiveSound(name);
  }
}

// Updates local volume variable
export type StatusProps = {
  sound: Audio.Sound;
  volume: number;
};

// Changes volume of audio playback based on increment/decrement
export type VolumeProps = {
  sound: Audio.Sound;
  volume: number;
};

export async function changeVolume({ sound, volume }: VolumeProps) {
  if (volume >= 0 && volume <= 1) {
    sound.setVolumeAsync(volume);
    await sound.getStatusAsync().then((data) => {
      volume = data.volume;
    });
  }
}

export type ActiveProps = {
  name: string;
  icon: string;
}

// Saves sounds to local storage to track when they are played
export async function saveActiveSound({ name, icon }: ActiveProps) {
  const activeSound = {
    soundName: name,
    soundIcon: icon,
  };

  let activeSounds;
  activeSounds = await AsyncStorage.getItem("activeSounds");

  if(!activeSounds) {
    activeSounds = [];
  } else {
    activeSounds = JSON.parse(activeSounds);
  }
  
  activeSounds.push(activeSound);
  activeSounds = JSON.stringify(activeSounds);
  AsyncStorage.setItem("activeSounds", activeSounds);
}

// Deleted sounds from local storage to track when they are stopped
export async function deleteActiveSound(name: string) {
  let activeSounds;
  activeSounds = await AsyncStorage.getItem("activeSounds");

  if(!activeSounds) {
    activeSounds = [];
  } else {
    activeSounds = JSON.parse(activeSounds);
  }

  let removed = activeSounds.filter(function (value: any) {
    return value.soundName !== name;
  });

  removed = JSON.stringify(removed);
  await AsyncStorage.setItem("activeSounds", removed);
}

// Fetches active sounds from local storage
export async function getActiveSounds() {
  let activeSounds;
  activeSounds = await AsyncStorage.getItem("activeSounds");

  if(!activeSounds) {
    activeSounds = [];
  } else {
    activeSounds = JSON.parse(activeSounds);
  }

  return activeSounds;
}