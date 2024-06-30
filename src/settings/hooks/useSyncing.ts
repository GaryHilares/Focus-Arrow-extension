import { useState, useEffect } from "react";

declare var browser: any;

export function useSyncing<Type>(
  query: string,
  state: Type,
  setState: (value: Type) => void,
  defaultValue: Type
): boolean {
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    browser.storage.local.get(query, (queryResult: { [key: string]: Type }) => {
      setLoaded(true);
      if (queryResult[query]) {
        setState(queryResult[query]);
      } else {
        setState(defaultValue);
      }
    });
  }, []);
  useEffect(() => {
    if (loaded) {
      browser.storage.local.set({ [query]: state });
    }
  }, [state]);
  return loaded;
}
