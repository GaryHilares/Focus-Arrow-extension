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
  private isEnabled(): boolean {
    const startTime = this.startTime;
    const endTime = this.endTime;
    const now = toMinutesSinceDayStart(getCurrentTimeInHHMM());
    const isInTimeRange =
      (startTime < now && endTime > now) ||
      (startTime > endTime && (startTime < now || endTime > now));
    return isInTimeRange;
  }
  private matchString(str: string): boolean {
    if (
      this.urlPattern.startsWith("/") &&
      this.urlPattern.endsWith("/") &&
      this.urlPattern.length >= 2
    ) {
      return RegExp(
        this.urlPattern.substring(1, this.urlPattern.length - 1),
        "i"
      ).test(str);
    }
    return str.toLowerCase().includes(this.urlPattern.toLowerCase());
  }
  public matchUrl(url: string): boolean {
    return this.matchesUrl && this.isEnabled() && this.matchString(url);
  }
  public matchTitle(title: string): boolean {
    return this.matchesTitle && this.isEnabled() && this.matchString(title);
  }
}
