import { initializeStorage, blockPages } from "../../src/background/services";
import type { Storage } from "../../src/background/browser.d.ts";

class FakeStorage implements Storage {
  constructor(private fakeData: { [key: string]: any } = {}) {}
  set(newData: { [key: string]: any }): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      for (let [key, value] of Object.entries(newData)) {
        this.fakeData[key] = value;
      }
      resolve();
    });
  }
  get(query: string[] | string | null): Promise<{ [key: string]: any }> {
    return new Promise<{ [key: string]: any }>((resolve, reject) => {
      if (query === null) {
        resolve(this.fakeData);
      } else if (typeof query === "string") {
        resolve({ [query]: this.fakeData[query] });
      } else {
        let result: { [key: string]: any } = {};
        for (let key of query) {
          result[key] = this.fakeData[key];
        }
        resolve(result);
      }
    });
  }
  remove(query: string[] | string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (typeof query === "string") {
        delete this.fakeData[query];
      } else {
        for (let key of query) {
          delete this.fakeData[key];
        }
      }
      resolve();
    });
  }
}

test("should initialize storage", async () => {
  const storage = new FakeStorage();
  initializeStorage(storage).then(() => {
    storage.get(null).then((result) => {
      expect(result).toStrictEqual({
        patterns: [],
        theme: "default",
        protectionType: "none",
        protectionDetails: null,
        v: 0,
      });
    });
  });
});

test("should update storage from the pre-v0 schema to the current schema", async () => {
  const storage = new FakeStorage({
    blockedPages: {
      name: "Default Profile",
      sites: [
        {
          pattern: "example.com",
          startTime: null,
          endTime: null,
          blocksUrl: true,
          blocksTitle: false,
        },
      ],
    },
    passwordData: {
      protectionType: "None",
      details: null,
    },
    theme: "default",
  });
  initializeStorage(storage).then(() => {
    storage.get(null).then((result) => {
      expect(result).toStrictEqual({
        patterns: [
          {
            url: "example.com",
            startTime: "00:00",
            endTime: "23:59",
            matchesUrl: true,
            matchesTitle: true,
          },
        ],
        theme: "default",
        protectionType: "none",
        protectionDetails: null,
        v: 0,
      });
    });
  });
});

test("should block page if pattern matches", async () => {
  const storage = new FakeStorage({
    patterns: [
      {
        url: "example.com",
        startTime: "00:00",
        endTime: "23:59",
        matchesUrl: true,
        matchesTitle: false,
      },
    ],
    theme: "default",
    protectionType: "none",
    protectionDetails: null,
    v: 0,
  });
  const tabs: Record<string, string> = { "1000": "example.com" };
  blockPages(
    (tabId: number, { url }: { url: string; [key: string]: any }) => {
      tabs[tabId.toString()] = url;
    },
    storage,
    1000,
    { url: "example.com" }
  ).then(() => {
    expect(tabs["1000"]).toBe(
      "https://liberty-arrow-api.vercel.app/block-screens/default"
    );
  });
});

test("should not block page if pattern does not match", async () => {
  const storage = new FakeStorage({
    patterns: [
      {
        url: "example.com",
        startTime: "00:00",
        endTime: "23:59",
        matchesUrl: true,
        matchesTitle: false,
      },
    ],
    theme: "default",
    protectionType: "none",
    protectionDetails: null,
    v: 0,
  });
  const tabs: Record<string, string> = { "1000": "example2.com" };
  blockPages(
    (tabId: number, { url }: { url: string; [key: string]: any }) => {
      tabs[tabId.toString()] = url;
    },
    storage,
    1000,
    { url: "example2.com" }
  ).then(() => {
    expect(tabs["1000"]).toBe("example2.com");
  });
});
