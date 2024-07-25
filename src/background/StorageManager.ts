import { BlockManager, InStoragePattern } from "./BlockManager";
import type { Storage } from "./browser.d.ts";

export class StorageManager {
  static async initializeStorage(storage: Storage): Promise<void> {
    if (await StorageManager.isMigrating(storage)) {
      StorageManager.migrateToNewVersion(storage);
      return;
    }
    storage.set({
      patterns: [],
      theme: "default",
      protectionType: "none",
      protectionDetails: null,
      v: 0,
    });
  }
  static async isMigrating(storage: Storage): Promise<boolean> {
    return storage
      .get(null)
      .then(
        (result: { v?: number; [key: string]: any }) =>
          Object.keys(result).length > 0 && !("v" in result)
      );
  }
  static migrateToNewVersion(storage: Storage): void {
    storage.get(null).then((result: { [key: string]: any }) => {
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
      storage
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
        .then(() => storage.remove(["blockedPages", "passwordData"]));
    });
  }
  async loadBlockManager(storage: Storage): Promise<BlockManager> {
    return storage
      .get("patterns")
      .then((result: { patterns: InStoragePattern[] }) => {
        return new BlockManager(result.patterns);
      });
  }
  async loadTheme(storage: Storage): Promise<string> {
    return storage
      .get("theme")
      .then((result: { theme: string }) => result.theme);
  }
}
