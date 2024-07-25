interface Storage {
  set: (newData: { [key: string]: any }) => Promise<void>;
  get: (query: string[] | string | null) => Promise<{ [key: string]: any }>;
  remove: (query: string[] | string) => Promise<void>;
}

interface Browser {
  storage: {
    local: Storage;
  };
  runtime: {
    onInstalled: {
      addListener: (callback: () => void) => void;
    };
  };
  tabs: {
    onUpdated: {
      addListener: (
        callback: (
          tabId: number,
          changeInfo: {
            url?: string;
            title?: string;
            [key: string]: any;
          }
        ) => void
      ) => void;
    };
    update: (
      tabId: number,
      updateProperties: { url: string; [key: string]: any }
    ) => void;
  };
}

export { Browser, Storage };
