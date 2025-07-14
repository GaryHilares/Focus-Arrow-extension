import { BlockManager, InStoragePattern } from "./BlockManager";
import * as browser from "webextension-polyfill";

/**
 * Class that manages the storage of the extension.
 */
export class StorageManager {
  /**
   * Initializes the storage of the extension.
   */
  public static async initializeStorage(): Promise<void> {
    const version = await StorageManager.getVersion();
    if (version !== null && version < 1) {
      StorageManager.migrateFromVersion(version);
      return;
    }
    browser.storage.local.set({
      patterns: [],
      theme: "https://focusarrow.app/block-screens/default",
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
  public static async getVersion(): Promise<number | null> {
    return browser.storage.local
      .get(null)
      .then((result: { v?: number; [key: string]: any }) => {
        if (Object.keys(result).length == 0) {
          return null;
        }
        if (!("v" in result)) {
          return -1;
        } else {
          return result.v;
        }
      });
  }

  /**
   * Migrates storage information to a new version.
   */
  public static migrateFromVersion(version: number): void {
    if (version == -1) {
      StorageManager.migrateFromVersionPre0();
    } else if (version == 0) {
      StorageManager.migrateFromVersion0();
    }
  }

  public static migrateFromVersionPre0(): void {
    browser.storage.local.get(null).then((result: { [key: string]: any }) => {
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
          theme: "https://focusarrow.app/block-screens/default",
          protectionType: isProtectionTypeValid ? protectionType : "none",
          protectionDetails: isProtectionTypeValid
            ? result.passwordData.details
            : null,
          v: 1,
          blockedPages: null,
          passwordData: null,
          email: null,
        })
        .then(() =>
          browser.storage.local.remove(["blockedPages", "passwordData"])
        );
    });
  }

  public static migrateFromVersion0(): void {
    browser.storage.local.get(null).then((result: { [key: string]: any }) => {
      browser.storage.local.set({
        patterns: result.patterns,
        theme: "https://focusarrow.app/block-screens/default",
        protectionType: result.protectionType,
        protectionDetails: result.protectionDetails,
        v: 1,
        email: null,
      });
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
