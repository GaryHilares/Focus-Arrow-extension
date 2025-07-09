import * as React from "react";
import { Pattern } from "./Pattern";
import * as styles from "./ProfileManager.module.scss";

interface ProfileEntryProps {
  pattern: Pattern;
  deletePattern: (oldPattern: Pattern) => void;
  setModalMode: (
    mode: { mode: "new" } | { mode: "edit"; target: Pattern }
  ) => void;
}

function ProfileEntry({
  pattern,
  setModalMode,
  deletePattern,
}: ProfileEntryProps) {
  return (
    <li className={styles.entry}>
      <span className={styles["entry-name"]}>{pattern.name}</span>
      <span className={styles["entry-url"]}>{pattern.url}</span>
      <span className={styles["entry-time"]}>
        ({pattern.startTime} - {pattern.endTime})
      </span>
      <ul className={styles["button-box"]}>
        <li>
          <button
            className={styles["edit-button"]}
            onClick={() => setModalMode({ mode: "edit", target: pattern })}
          >
            Edit
          </button>
        </li>
        <li>
          <button
            className={styles["delete-button"]}
            onClick={() => deletePattern(pattern)}
          >
            Delete
          </button>
        </li>
      </ul>
    </li>
  );
}

interface ProfileManagerProps {
  patterns: Pattern[];
  deletePattern: (oldPattern: Pattern) => void;
  setModalMode: (
    mode: { mode: "new" } | { mode: "edit"; target: Pattern }
  ) => void;
}

function ProfileManager({
  patterns,
  deletePattern,
  setModalMode,
}: ProfileManagerProps) {
  return (
    <section className={styles.main}>
      <header>
        <h1>Blocked pages</h1>
        <button
          className={styles["new-button"]}
          onClick={() => setModalMode({ mode: "new" })}
        >
          Add
        </button>
      </header>
      <ul>
        {patterns.map((pattern) => (
          <ProfileEntry
            key={pattern.name}
            pattern={pattern}
            setModalMode={setModalMode}
            deletePattern={deletePattern}
          />
        ))}
      </ul>
    </section>
  );
}

export { ProfileManager };
