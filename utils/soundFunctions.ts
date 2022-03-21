import { Audio } from "expo-av";
import { AVPlaybackSource } from "expo-av/build/AV.types";

export type SoundProps = {
  isPlaying: boolean;
  sound: Audio.Sound;
  path: AVPlaybackSource;
};

// Function to toggle audio playback
export async function toggleSound({ isPlaying, sound, path }: SoundProps) {
  if (!isPlaying) {
    await sound.loadAsync(path);
    await sound.playAsync();
    sound.setIsLoopingAsync(true);
  } else {
    await sound.stopAsync();
    await sound.unloadAsync();
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
