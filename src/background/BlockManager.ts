import { BlockEntry } from "./BlockEntry";

export interface InStoragePattern {
  url: string;
  matchesUrl: boolean;
  matchesTitle: boolean;
  startTime: string;
  endTime: string;
}

export class BlockManager {
  entries: BlockEntry[];
  constructor(patterns: InStoragePattern[]) {
    this.entries = patterns.map(
      (pattern) =>
        new BlockEntry(
          pattern.url,
          pattern.matchesUrl,
          pattern.matchesTitle,
          pattern.startTime,
          pattern.endTime
        )
    );
  }
  checkUrlForMatch(url: string): boolean {
    return this.entries.some((entry) => entry.matchUrl(url));
  }
  checkTitleForMatch(title: string): boolean {
    return this.entries.some((entry) => entry.matchTitle(title));
  }
}
