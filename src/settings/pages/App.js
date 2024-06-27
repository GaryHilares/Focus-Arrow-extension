import React, { useState } from "react";
import { ProfileManager } from "../components/ProfileManager";
import { EditModal } from "../components/EditModal";

function useEditableList() {
  const [list, setList] = useState([]);
  function addElement(element) {
    setList((oldList) => [...oldList, element]);
  }
  function editElement(oldElement, newElement) {
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
  function deleteElement(oldElement) {
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
