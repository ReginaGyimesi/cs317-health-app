import { Audio } from "expo-av";
import { useState } from "react";

export type SoundButtonProps = {
    sound: Audio.Sound,
    name: string,
    volume: number,
    isPlaying: boolean,
    path: any,
};

// Function to toggle audio playback
export async function toggleSound(audio: SoundButtonProps) {
    if(audio.isPlaying === false) {
      await audio.sound.loadAsync(audio.path);
      await audio.sound.playAsync();
      audio.sound.setIsLoopingAsync(true);
      audio.isPlaying = true;
    }
    else {
      await audio.sound.stopAsync();
      await audio.sound.unloadAsync();
      audio.isPlaying = false;
    }
  }

  // Updates local volume variable
  export async function updateStatus(audio: SoundButtonProps) {
    await audio.sound.getStatusAsync().then((data => {
      audio.volume = data.volume;
    }));
  }

  // Changes volume of audio playback based on increment/decrement
  export async function changeVolume(audio: SoundButtonProps, change : number) {
    if(audio.volume + change >= 0 && audio.volume + change <= 1) {
      audio.sound.setVolumeAsync(audio.volume + change);
      updateStatus(audio);
    }
  }