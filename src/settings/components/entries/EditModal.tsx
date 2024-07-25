import * as React from "react";
import { useState, useEffect } from "react";
import type { Pattern } from "./Pattern";
import { Modal } from "../common/Modal";
import {
  LabelledCheckboxInput,
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
  const [matchesUrl, setMatchesUrl] = useState<boolean>(true);
  const [matchesTitle, setMatchesTitle] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("00:00");
  const [endTime, setEndTime] = useState<string>("23:59");
  useEffect(() => {
    if (target) {
      setMatchesUrl(target.matchesUrl);
      setMatchesTitle(target.matchesTitle);
      setUrl(target.url);
      setStartTime(target.startTime);
      setEndTime(target.endTime);
    }
  }, []);
  function close() {
    setMatchesUrl(true);
    setMatchesTitle(false);
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
    const newPattern: Pattern = {
      matchesUrl: matchesUrl,
      matchesTitle: matchesTitle,
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
        <LabelledCheckboxInput
          value={matchesUrl}
          onChange={setMatchesUrl}
          label="Match URL"
        />
        <LabelledCheckboxInput
          value={matchesTitle}
          onChange={setMatchesTitle}
          label="Match title"
        />
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
