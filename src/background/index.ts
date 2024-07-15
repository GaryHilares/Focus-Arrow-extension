import { initializeStorage, blockPages } from "./services";

declare var browser: any;

browser.runtime.onInstalled.addListener(initializeStorage);
browser.tabs.onUpdated.addListener(blockPages);
