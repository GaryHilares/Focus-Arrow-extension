declare var browser: any;

browser.runtime.onInstalled.addListener(() => {
  console.log("Hello world");
});
