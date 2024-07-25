import * as React from "react";
import { Pattern } from "./Pattern";
import * as styles from "./ProfileManager.module.scss";

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
        <h1>Pages</h1>
        <button onClick={() => setModalMode({ mode: "new" })}>Add</button>
      </header>
      <ul>
        {patterns.map((pattern) => (
          <li key={pattern.url} className={styles.entry}>
            <span className={styles["entry-url"]}>{pattern.url}</span>
            <ul>
              <li>
                <button
                  onClick={() =>
                    setModalMode({ mode: "edit", target: pattern })
                  }
                >
                  Edit
                </button>
              </li>
              <li>
                <button onClick={() => deletePattern(pattern)}>Delete</button>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}

export { ProfileManager };
