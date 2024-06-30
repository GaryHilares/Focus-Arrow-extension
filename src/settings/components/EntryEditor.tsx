import * as React from "react";
import { useState } from "react";
import { ProfileManager } from "./ProfileManager";
import { EditModal } from "./EditModal";
import { useSyncedPatterns } from "../hooks/useSyncedPaterns";

export function EntryEditor() {
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
