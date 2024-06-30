import { useSyncing } from "./useSyncing";
import { useState } from "react";

type Pattern = { name: string; url: string };

export function useSyncedPatterns(): [
  boolean,
  Pattern[],
  (toAdd: Pattern) => void,
  (oldElement: Pattern, newElement: Pattern) => void,
  (toDelete: Pattern) => void
] {
  const [list, setList] = useState<Pattern[]>([]);
  const loaded = useSyncing<Pattern[]>("patterns", list, setList, []);
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
  return [loaded, list, addElement, editElement, deleteElement];
}
