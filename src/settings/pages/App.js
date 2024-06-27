import React, { useState } from "react";
import { ProfileManager } from "../components/ProfileManager";
import { EditModal } from "../components/EditModal";

function App() {
  const [patterns, setPatterns] = useState([]);
  const [modalTarget, setModalTarget] = useState(null); // null, {mode: "new"}, or {mode: "edit", target: ...}
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
    setModalTarget(null);
  }
  return (
    <>
      {modalTarget && (
        <EditModal
          patterns={patterns}
          addPattern={addPattern}
          editPattern={editPattern}
          target={modalTarget.mode == "edit" ? modalTarget.target : null}
          closeModal={closeModal}
        />
      )}
      <ProfileManager
        patterns={patterns}
        deletePattern={deletePattern}
        setModalTarget={setModalTarget}
      />
    </>
  );
}

export default App;
