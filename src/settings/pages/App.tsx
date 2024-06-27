import * as React from "react";
import { useState, useEffect } from "react";
import { ProfileManager, Pattern } from "../components/ProfileManager";
import { EditModal } from "../components/EditModal";

declare var browser: any;

function useSyncedPatterns(): [
  boolean,
  Pattern[],
  (toAdd: Pattern) => void,
  (oldElement: Pattern, newElement: Pattern) => void,
  (toDelete: Pattern) => void
] {
  const [loaded, setLoaded] = useState(false);
  const [list, setList] = useState([]);
  function addElement(element: Pattern): void {
    setList((oldList) => [...oldList, element]);
  }
  function editElement(oldElement: Pattern, newElement: Pattern): void {
    setList((oldList) => {
      const newList = [...oldList];
      newList.splice(
        newList.findIndex((element) => element === oldElement),
        1,
        newElement
      );
      return newList;
    });
  }
  function deleteElement(oldElement: Pattern): void {
    setList((oldList) => oldList.filter((element) => element !== oldElement));
  }
  useEffect(() => {
    browser.storage.local.get(
      "patterns",
      ({ patterns }: { patterns: Pattern[] }) => {
        setLoaded(true);
        if (patterns) {
          setList(patterns);
        } else {
          setList([]);
        }
      }
    );
  }, []);
  useEffect(() => {
    if (loaded) {
      browser.storage.local.set({ patterns: list });
    }
  }, [list]);
  return [loaded, list, addElement, editElement, deleteElement];
}

function App() {
  const [modalMode, setModalMode] = useState(null);
  const [loaded, patterns, addPattern, editPattern, deletePattern] =
    useSyncedPatterns();

  function closeModal(): void {
    setModalMode(null);
  }
  if (!loaded) {
    return null;
  }
  return (
    <>
      {modalMode && (
        <EditModal
          patterns={patterns}
          addPattern={addPattern}
          editPattern={editPattern}
          target={modalMode.mode == "edit" ? modalMode.target : null}
          closeModal={closeModal}
        />
      )}
      <ProfileManager
        patterns={patterns}
        deletePattern={deletePattern}
        setModalMode={setModalMode}
      />
    </>
  );
}

export default App;
