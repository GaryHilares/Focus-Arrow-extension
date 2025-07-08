import * as React from "react";
import { useState, useEffect } from "react";
import { Pattern } from "./Pattern";
import { Modal } from "../common/Modal";
import {
  ButtonBox,
  LabelledTextInput,
  LabelledTimeInput,
} from "../common/LabelledInputs";
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
  const [name, setName] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("00:00");
  const [endTime, setEndTime] = useState<string>("23:59");
  useEffect(() => {
    if (target) {
      setName(target.name);
      setUrl(target.url);
      setStartTime(target.startTime);
      setEndTime(target.endTime);
    }
  }, []);
  function close() {
    setName("");
    setUrl("");
    setStartTime("00:00");
    setEndTime("23:59");
    closeModal();
  }
  function validate(newPattern: Pattern): boolean {
    for (let pattern of patterns) {
      if (
        newPattern.name === pattern.name &&
        (!target || pattern.name !== target.name)
      ) {
        return false;
      }
    }
    return true;
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const newPattern = {
      name: name,
      url: url,
      startTime: startTime,
      endTime: endTime,
    };
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
        <LabelledTimeInput
          value={startTime}
          onChange={setStartTime}
          label="Start time"
        />
        <LabelledTimeInput
          value={endTime}
          onChange={setEndTime}
          label="End time"
        />
        <ButtonBox />
      </form>
    </Modal>
  );
}

export { EditModal };
