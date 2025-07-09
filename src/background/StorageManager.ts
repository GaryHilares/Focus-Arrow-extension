import { BlockManager, InStoragePattern } from "./BlockManager";

declare var browser: any;

/**
 * Class that manages the storage of the extension.
 */
export class StorageManager {
  /**
   * Initializes the storage of the extension.
   */
  public static async initializeStorage(): Promise<void> {
    if (await StorageManager.isMigrating()) {
      StorageManager.migrateToNewVersion();
      return;
    }
    browser.storage.local.set({
      patterns: [],
      theme: "https://focus-arrow-api.vercel.app/block-screens/default",
      protectionType: "none",
      protectionDetails: null,
      email: null,
      v: 1,
    });
  }

  /**
   * Checks if the storage needs to be migrated to a new version.
   * @returns Will resolve to true if migration is required, false otherwise.
   */
  public static async isMigrating(): Promise<boolean> {
    return browser.storage.local
      .get(null)
      .then(
        (result: { v?: number; [key: string]: any }) =>
          Object.keys(result).length > 0 && !("v" in result)
      );
  }

  /**
   * Migrates storage information to a new version.
   */
  public static migrateToNewVersion(): void {
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

  /**
   * Loads a BlockManager with the patterns in storage.
   * @returns Resolves to BlockManager with in-storage patterns.
   */
  public async loadBlockManager(): Promise<BlockManager> {
    return browser.storage.local
      .get("patterns")
      .then((result: { patterns: InStoragePattern[] }) => {
        return new BlockManager(result.patterns);
      });
  }

  /**
   * Loads the theme name in-storage.
   * @returns Will resolve to in-storage theme name.
   */
  public async loadTheme(): Promise<string> {
    return browser.storage.local
      .get("theme")
      .then((result: { theme: string }) => result.theme);
  }
}
