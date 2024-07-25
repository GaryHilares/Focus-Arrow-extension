import { StorageManager } from "./StorageManager";

declare var browser: any;

function initializeStorage() {
  StorageManager.initializeStorage();
}

async function blockPages(
  tabId: number,
  changeInfo: { url?: string; tab: any; [key: string]: any }
) {
  if (changeInfo.url) {
    const url = changeInfo.url;
    const mgr = new StorageManager();
    const blockMgr = await mgr.loadBlockManager();
    const shouldUpdate = blockMgr.checkForMatch(url);
    if (shouldUpdate) {
      const theme = await mgr.loadTheme();
      browser.tabs.update(tabId, {
        url: `https://liberty-arrow-api.vercel.app/block-screens/${theme}`,
      });
    }
  }
}

export { initializeStorage, blockPages };
