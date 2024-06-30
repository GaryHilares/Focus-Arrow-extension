import { BlockEntry } from "./BlockEntry";

export interface InStoragePattern {
  name: string;
  url: string;
}

export class BlockManager {
  entries: BlockEntry[];
  constructor(patterns: InStoragePattern[]) {
    this.entries = patterns.map(
      (pattern) => new BlockEntry(pattern.name, pattern.url)
    );
  }
  checkForMatch(url: string): boolean {
    return this.entries.some((entry) => entry.match(url));
  }
}
