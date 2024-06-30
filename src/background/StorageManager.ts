import { BlockManager, InStoragePattern } from "./BlockManager";

declare var browser: any;

export class StorageManager {
  static saveDefault(): void {
    browser.storage.local.set({
      patterns: [],
    });
  }
  async loadBlockManager(): Promise<BlockManager> {
    return browser.storage.local
      .get("patterns")
      .then((result: { patterns: InStoragePattern[] }) => {
        return new BlockManager(result.patterns);
      });
  }
}
