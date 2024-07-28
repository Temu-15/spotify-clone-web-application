function convertMillisecondsToMinSec(milliseconds) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

  return minutes + ":" + formattedSeconds;
}

module.exports = { convertMillisecondsToMinSec };
