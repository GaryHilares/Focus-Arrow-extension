import { StorageManager } from "./StorageManager";

declare var browser: any;

export function setDefault() {
  StorageManager.saveDefault();
}

export async function blockPages(
  tabId: number,
  changeInfo: { url?: string; tab: any; [key: string]: any }
) {
  if (changeInfo.url) {
    const url = changeInfo.url;
    console.log("services:15");
    const mgr = new StorageManager();
    const blockMgr = await mgr.loadBlockManager();
    const shouldUpdate = blockMgr.checkForMatch(url);
    console.log("services:19");
    console.log(url, shouldUpdate);
    if (shouldUpdate) {
      browser.tabs.update(tabId, {
        url: "https://liberty-arrow-backend.vercel.app/block-screens/default",
      });
    }
  }
}
