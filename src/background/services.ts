import { StorageManager } from "./StorageManager";
import type { Storage } from "./browser.d.ts";

function initializeStorage(storage: Storage) {
  StorageManager.initializeStorage(storage);
}

async function blockPages(
  updateTab: (
    tabId: number,
    updateProperties: { url: string; [key: string]: any }
  ) => void,
  storage: Storage,
  tabId: number,
  changeInfo: { url?: string; title?: string; [key: string]: any }
) {
  if (changeInfo.url || changeInfo.title) {
    const mgr = new StorageManager();
    const blockMgr = await mgr.loadBlockManager(storage);
    const matchesTitle =
      changeInfo.title && blockMgr.checkTitleForMatch(changeInfo.title);
    const matchesUrl =
      changeInfo.url && blockMgr.checkUrlForMatch(changeInfo.url);
    const shouldUpdate = matchesTitle || matchesUrl;
    if (shouldUpdate) {
      const theme = await mgr.loadTheme(storage);
      updateTab(tabId, {
        url: `https://liberty-arrow-api.vercel.app/block-screens/${theme}`,
      });
    }
  }
}

export { initializeStorage, blockPages };
