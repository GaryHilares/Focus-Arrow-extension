import { setDefault, blockPages } from "./services";

declare var browser: any;

browser.runtime.onInstalled.addListener(setDefault);
browser.tabs.onUpdated.addListener(blockPages);
