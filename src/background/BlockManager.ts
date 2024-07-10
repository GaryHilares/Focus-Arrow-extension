import { BlockEntry } from "./BlockEntry";

export interface InStoragePattern {
  name: string;
  url: string;
  startTime: string;
  endTime: string;
}

export class BlockManager {
  entries: BlockEntry[];
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
  checkForMatch(url: string): boolean {
    return this.entries.some((entry) => entry.match(url));
  }
}
