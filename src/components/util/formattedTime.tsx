export default function formattedTime(timeMs: number) {
  const seconds = timeMs / 1000;
  let remainingSeconds, hours, minutes;
  if (seconds > 3600) {
    hours = Math.floor(seconds / 3600);
    remainingSeconds = Math.floor(seconds % 3600);
  } else {
    remainingSeconds = Math.floor(seconds);
  }
  if (remainingSeconds > 60) {
    minutes = Math.floor(seconds / 60);
    remainingSeconds = Math.floor(seconds % 60);
  }
  return `${hours ? `${hours}:` : ''}${minutes ? `${minutes}:` : ''}${remainingSeconds ? `${remainingSeconds}` : ''}`;
}
