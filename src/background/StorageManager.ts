import { BlockManager, InStoragePattern } from "./BlockManager";

declare var browser: any;

export class StorageManager {
  static async initializeStorage(): Promise<void> {
    if (await StorageManager.isMigrating()) {
      StorageManager.migrateToNewVersion();
      return;
    }
    browser.storage.local.set({
      patterns: [],
      theme: "default",
      protectionType: "none",
      protectionDetails: null,
      v: 0,
    });
  }
  static async isMigrating(): Promise<boolean> {
    return browser.storage.local
      .get("v")
      .then((result: { v?: number }) => result == undefined);
  }
  static migrateToNewVersion(): void {
    browser.storage.local.get(null, (result: { [key: string]: any }) => {
      const sites = result.blockedPages.sites.map(
        (site: any, index: number) => ({
          name: `Entry ${index}`,
          url: site.pattern,
          startTime: site.startTime || "00:00",
          endTime: site.endTime || "23:59",
        })
      );
      browser.storage.set({
        patterns: sites,
        theme: result.theme,
        protectionType: result.passwordData.protectionType,
        protectionDetails: result.passwordData.details,
        v: 0,
      });
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
