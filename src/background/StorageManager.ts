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
      .then((result: { v?: number }) => Object.keys(result).length == 0);
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
      const protectionType = result.passwordData.protectionType.toLowerCase();
      const isProtectionTypeValid =
        protectionType == "none" || protectionType == "password";
      browser.storage.local
        .set({
          patterns: sites,
          theme: result.theme,
          protectionType: isProtectionTypeValid ? protectionType : "none",
          protectionDetails: isProtectionTypeValid
            ? result.passwordData.details
            : null,
          v: 0,
          blockedPages: null,
          passwordData: null,
        })
        .then(() =>
          browser.storage.local.remove(["blockedPages", "passwordData"])
        );
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
