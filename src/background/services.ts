import { StorageManager } from "./StorageManager";

declare var browser: any;

function setDefault() {
  StorageManager.saveDefault();
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
        url: `https://liberty-arrow-backend.vercel.app/block-screens/${theme}`,
      });
    }
  }
}

export { setDefault, blockPages };
