import * as React from "react";
import { useState } from "react";
import { ProfileManager, Pattern } from "../components/ProfileManager";
import { EditModal } from "../components/EditModal";

function useEditableList(): [
  Pattern[],
  (element: any) => void,
  (oldElement: any, newElement: any) => void,
  (oldElement: any) => void
] {
  const [list, setList] = useState([]);
  function addElement(element: any): void {
    setList((oldList) => [...oldList, element]);
  }
  function editElement(oldElement: any, newElement: any): void {
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
  function deleteElement(oldElement: any): void {
    setList((oldList) => oldList.filter((element) => element !== oldElement));
  }

  return [list, addElement, editElement, deleteElement];
}

function App() {
  const [modalMode, setModalMode] = useState(null);
  const [patterns, addPattern, editPattern, deletePattern] = useEditableList();

  function closeModal() {
    setModalMode(null);
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
