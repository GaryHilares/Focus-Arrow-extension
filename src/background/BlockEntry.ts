function toMinutesSinceDayStart(str: string) {
  if (!/(?:[01][0-9]|2[0-3]):[0-5][0-9]/.test(str)) {
    console.log(`Cannot parse time ${str} in incorrect format.`);
    throw new Error("Cannot parse time in incorrect format.");
  }
  const parts = str.split(":");
  const hour = parseInt(parts[0]);
  const minutes = parseInt(parts[1]);
  return hour * 60 + minutes;
}

function getCurrentTimeInHHMM() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export class BlockEntry {
  startTime: number;
  endTime: number;
  constructor(
    private urlPattern: string,
    private matchesUrl: boolean,
    private matchesTitle: boolean,
    startTime: string,
    endTime: string
  ) {
    this.startTime = toMinutesSinceDayStart(startTime);
    this.endTime = toMinutesSinceDayStart(endTime);
  }
  matchUrl(url: string): boolean {
    if (!this.matchesUrl) {
      return false;
    }
    const pattern = this.urlPattern;
    const startTime = this.startTime;
    const endTime = this.endTime;
    const now = toMinutesSinceDayStart(getCurrentTimeInHHMM());
    const isInTimeRange =
      (startTime < now && endTime > now) ||
      (startTime > endTime && (startTime < now || endTime > now));
    if (
      pattern.startsWith("/") &&
      pattern.endsWith("/") &&
      pattern.length >= 2
    ) {
      return (
        isInTimeRange &&
        RegExp(pattern.substring(1, pattern.length - 1), "i").test(url)
      );
    }
    return isInTimeRange && url.toLowerCase().includes(pattern.toLowerCase());
  }
  matchTitle(title: string): boolean {
    if (!this.matchesTitle) {
      return false;
    }
    const pattern = this.urlPattern;
    const startTime = this.startTime;
    const endTime = this.endTime;
    const now = toMinutesSinceDayStart(getCurrentTimeInHHMM());
    const isInTimeRange =
      (startTime < now && endTime > now) ||
      (startTime > endTime && (startTime < now || endTime > now));
    if (
      pattern.startsWith("/") &&
      pattern.endsWith("/") &&
      pattern.length >= 2
    ) {
      return (
        isInTimeRange &&
        RegExp(pattern.substring(1, pattern.length - 1), "i").test(title)
      );
    }
    return isInTimeRange && title.toLowerCase().includes(pattern.toLowerCase());
  }
}
