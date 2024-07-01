import { BlockManager, InStoragePattern } from "./BlockManager";

declare var browser: any;

export class StorageManager {
  static saveDefault(): void {
    browser.storage.local.set({
      patterns: [],
      theme: "default",
      protectionType: "none",
    });
  }
  async loadBlockManager(): Promise<BlockManager> {
    return browser.storage.local
      .get("patterns")
      .then((result: { patterns: InStoragePattern[] }) => {
        return new BlockManager(result.patterns);
      });
  }
  async loadTheme(): Promise<string> {
    return browser.storage.local
      .get("theme")
      .then((result: { theme: string }) => result.theme);
  }
}
