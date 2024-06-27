import React, { useState } from "react";
import { ProfileManager } from "../components/ProfileManager";
import { EditModal } from "../components/EditModal";

function App() {
  const [patterns, setPatterns] = useState([]);
  const [modalMode, setModalMode] = useState(null);
  function addPattern(pattern) {
    setPatterns((oldPatterns) => [...oldPatterns, pattern]);
  }
  function editPattern(oldPattern, newPattern) {
    setPatterns((oldPatterns) => {
      const newPatterns = [...oldPatterns];
      newPatterns.splice(
        newPatterns.findIndex((element) => element === oldPattern),
        1,
        newPattern
      );
      return newPatterns;
    });
  }
  function deletePattern(pattern) {
    setPatterns((oldPatterns) =>
      oldPatterns.filter((element) => element !== pattern)
    );
  }
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
