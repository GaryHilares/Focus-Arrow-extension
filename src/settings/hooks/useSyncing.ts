import { useState, useEffect, Dispatch, SetStateAction } from "react";

declare var browser: any;

function useAutoSave<Type>(query: string, state: Type): void {
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  useEffect(() => {
    if (!firstLoad) {
      browser.storage.local.set({ [query]: state });
    } else {
      setFirstLoad(false);
    }
  }, [state]);
}

function useAutoInitialLoad<Type>(
  query: string
): [boolean, Type, Dispatch<SetStateAction<Type>>] {
  const [state, setState] = useState<Type>();
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    browser.storage.local.get(query, (queryResult: { [key: string]: Type }) => {
      if (queryResult[query] !== undefined) {
        setState(queryResult[query]);
      } else {
        console.error(
          `Could not retrieve "${query}" from browser.storage.local.`
        );
      }
      setLoaded(true);
    });
  }, []);
  return [loaded, state, setState];
}

function useSyncing<Type>(
  query: string
): [boolean, Type, Dispatch<SetStateAction<Type>>] {
  const [loaded, state, setState] = useAutoInitialLoad<Type>(query);
  useAutoSave(query, state);
  return [loaded, state, setState];
}

function setUninstallEmailAddress(email: string) {
  browser.runtime.setUninstallURL(
    `https://focusarrow.app/uninstall?email=${email}`
  );
}

export {
  useAutoSave,
  useAutoInitialLoad,
  useSyncing,
  setUninstallEmailAddress,
};
