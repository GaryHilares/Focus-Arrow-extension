/**
 * Converts a time of the day to the amount of minutes since the day started.
 * @param str Time of day represented as string.
 * @returns Number of minutes since day started.
 * @throws Error if the time string is not valid (programmer error).
 * @example toMinutesSinceDayStart("01:59") // returns 119
 * @example toMinutesSinceDayStart("23:00") // returns 23 * 60
 * @example toMinutesSinceDayStart("abc") // throws Error
 */
function toMinutesSinceDayStart(str: string): number {
  /** @todo Fix: Might not throw error (spec behavior) when str = "a23:59" */
  if (!/(?:[01][0-9]|2[0-3]):[0-5][0-9]/.test(str)) {
    console.log(`Cannot parse time ${str} in incorrect format.`);
    throw new Error("Cannot parse time in incorrect format.");
  }
  const parts = str.split(":");
  const hour = parseInt(parts[0]);
  const minutes = parseInt(parts[1]);
  return hour * 60 + minutes;
}

/**
 * Produces current time of the day in the format "HH:MM".
 * @returns Current time of the day in the format "HH:MM".
 */
function getCurrentTimeInHHMM(): string {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

/**
 * Represents a entry of pages that should be blocked.
 */
class BlockEntry {
  startTime: number;
  endTime: number;

  /**
   * Creates a new BlockEntry object.
   * @param name Name of the block entry.
   * @param urlPattern Pattern to be matched by the block entry.
   * @param startTime Time of day at which block entry should start applying.
   * @param endTime Time of day at which block entry should stop applying.
   */
  public constructor(
    private name: string,
    private urlPattern: string,
    startTime: string,
    endTime: string,
    private generateDate: () => string = getCurrentTimeInHHMM
  ) {
    this.startTime = toMinutesSinceDayStart(startTime);
    this.endTime = toMinutesSinceDayStart(endTime);
  }

  /**
   * Checks if the given URL should be blocked by this pattern or not.
   * @param url URL to be checked for a match.
   * @returns True if the given URL matches this pattern, false otherwise.
   */
  public match(url: string): boolean {
    const pattern = this.urlPattern;
    const startTime = this.startTime;
    const endTime = this.endTime;
    const now = toMinutesSinceDayStart(this.generateDate());
    const isInTimeRange =
      (startTime <= now && endTime >= now) ||
      (startTime > endTime && (startTime <= now || endTime >= now));
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
}

export { BlockEntry };
