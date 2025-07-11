import * as browser from "webextension-polyfill";
import {
  initializeStorage,
  blockPages,
  initializeUninstallUrl,
} from "./services";

browser.runtime.onInstalled.addListener(initializeStorage);
browser.runtime.onInstalled.addListener(initializeUninstallUrl);
browser.tabs.onUpdated.addListener(blockPages);
