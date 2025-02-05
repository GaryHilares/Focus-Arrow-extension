import { BlockEntry } from "./BlockEntry";

/**
 * Represents how a blocking pattern is stored in the browser storage.
 */
export interface InStoragePattern {
  name: string;
  url: string;
  startTime: string;
  endTime: string;
}

/**
 * Manages a group of block entries.
 */
export class BlockManager {
  entries: BlockEntry[];

  /**
   * Creates a new BlockManager that manages the given patterns in storage.
   * @param patterns Patterns that are in storage.
   */
  constructor(patterns: InStoragePattern[]) {
    this.entries = patterns.map(
      (pattern) =>
        new BlockEntry(
          pattern.name,
          pattern.url,
          pattern.startTime,
          pattern.endTime
        )
    );
  }

  /**
   * Checks if any pattern managed by this block manager should block given URL.
   * @param url URL to be checked for.
   * @returns True if any pattern would block this URL, false otherwise.
   */
  checkForMatch(url: string): boolean {
    return this.entries.some((entry) => entry.match(url));
  }
}
