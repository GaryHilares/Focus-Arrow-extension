import {
  initializeStorage,
  blockPages,
  initializeUninstallUrl,
} from "./services";

declare var browser: any;

browser.runtime.onInstalled.addListener(initializeStorage);
browser.runtime.onInstalled.addListener(initializeUninstallUrl);
browser.tabs.onUpdated.addListener(blockPages);
