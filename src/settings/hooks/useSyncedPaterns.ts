import { useSyncing } from "./useSyncing";

interface Pattern {
  url: string;
  startTime: string;
  endTime: string;
}

function useSyncedPatterns(): [
  boolean,
  Pattern[],
  (toAdd: Pattern) => void,
  (oldElement: Pattern, newElement: Pattern) => void,
  (toDelete: Pattern) => void
] {
  const [loaded, list, setList] = useSyncing<Pattern[]>("patterns");
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

export { useSyncedPatterns };
