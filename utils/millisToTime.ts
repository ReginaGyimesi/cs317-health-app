// https://stackoverflow.com/questions/19700283/how-to-convert-time-in-milliseconds-to-hours-min-sec-format-in-javascript
export const millisToTime = (duration: number) => {
  let milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  let myHours = hours < 10 ? "0" + hours : hours;
  let myMinutes = minutes < 10 ? "0" + minutes : minutes;
  let mySeconds = seconds < 10 ? "0" + seconds : seconds;

  return myHours + ":" + myMinutes + ":" + mySeconds;
};
