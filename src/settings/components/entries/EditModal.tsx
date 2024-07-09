import * as React from "react";
import { useState, useEffect } from "react";
import { Pattern } from "./Pattern";
import { Modal } from "../common/Modal";
import { LabelledTextInput } from "../common/LabelledInputs";
import * as styles from "./EditModal.module.scss";

interface EditModalProps {
  patterns: Pattern[];
  addPattern: (pattern: Pattern) => void;
  editPattern: (oldPattern: Pattern, newPattern: Pattern) => void;
  target: Pattern;
  closeModal: () => void;
}

function EditModal({
  patterns,
  addPattern,
  editPattern,
  target,
  closeModal,
}: EditModalProps) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (target) {
      setName(target.name);
      setUrl(target.url);
    }
  }, []);
  function close() {
    setName("");
    setUrl("");
    closeModal();
  }
  function validate(newPattern: Pattern): boolean {
    for (let pattern of patterns) {
      if (newPattern.name === pattern.name) {
        return false;
      }
    }
    return true;
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const newPattern = { name: name, url: url };
    if (validate(newPattern)) {
      if (target) {
        editPattern(target, newPattern);
      } else {
        addPattern(newPattern);
      }
      close();
    }
  }
  return (
    <Modal>
      <form
        onSubmit={handleSubmit}
        onReset={close}
        className={styles["edit-form"]}
      >
        <h1>Create entry</h1>
        <LabelledTextInput value={name} onChange={setName} label="Name" />
        <LabelledTextInput value={url} onChange={setUrl} label="URL" />
        <div className={styles["button-box"]}>
          <input type="submit" />
          <input type="reset" />
        </div>
      </form>
    </Modal>
  );
}

export { EditModal };
