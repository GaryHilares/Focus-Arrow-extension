import * as React from "react";
import { useState, useEffect } from "react";
import { Pattern } from "./Pattern";
import { Modal } from "../common/Modal";
import { LabelledTextInput, LabelledTimeInput } from "../common/LabelledInputs";
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
  const [url, setUrl] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("00:00");
  const [endTime, setEndTime] = useState<string>("23:59");
  useEffect(() => {
    if (target) {
      setUrl(target.url);
      setStartTime(target.startTime);
      setEndTime(target.endTime);
    }
  }, []);
  function close() {
    setUrl("");
    setStartTime("00:00");
    setEndTime("23:59");
    closeModal();
  }
  function validate(newPattern: Pattern): boolean {
    for (let pattern of patterns) {
      if (
        newPattern.url === pattern.url &&
        (!target || pattern.url !== target.url)
      ) {
        return false;
      }
    }
    return true;
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const newPattern = {
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
        <div className={styles["button-box"]}>
          <input type="submit" value="Accept" />
          <input type="reset" value="Cancel" />
        </div>
      </form>
    </Modal>
  );
}

export { EditModal };
