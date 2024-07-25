import { initializeStorage, blockPages } from "./services";
import type { Browser } from "./browser.d.ts";

declare var browser: Browser;

browser.runtime.onInstalled.addListener(
  initializeStorage.bind(null, browser.storage.local)
);
browser.tabs.onUpdated.addListener(
  blockPages.bind(null, browser.tabs.update, browser.storage.local)
);
