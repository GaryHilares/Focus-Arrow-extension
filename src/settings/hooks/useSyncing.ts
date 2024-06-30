import { useState, useEffect } from "react";
import { Dispatch, SetStateAction } from "react";

declare var browser: any;

export function useSyncing<Type>(
  query: string
): [boolean, Type, Dispatch<SetStateAction<Type>>] {
  const [state, setState] = useState<Type>();
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    browser.storage.local.get(query, (queryResult: { [key: string]: Type }) => {
      setLoaded(true);
      if (queryResult[query]) {
        setState(queryResult[query]);
      } else {
        console.error(
          `Could not retrieve "${query}" from browser.storage.local.`
        );
      }
    });
  }, []);
  useEffect(() => {
    if (loaded) {
      browser.storage.local.set({ [query]: state });
    }
  }, [state]);
  return [loaded, state, setState];
}
