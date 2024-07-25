import { initializeStorage, blockPages } from "../../src/background/services";
import type { Storage } from "../../src/background/browser.d.ts";

class FakeStorage implements Storage {
  constructor(private fakeData: { [key: string]: any } = {}) {}
  set(newData: { [key: string]: any }): Promise<void> {
    console.log(newData);
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
