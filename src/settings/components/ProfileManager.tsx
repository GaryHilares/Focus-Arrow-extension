import * as React from "react";

export type Pattern = { name: string; url: string };

function ProfileManager({
  patterns,
  deletePattern,
  setModalMode,
}: {
  patterns: Pattern[];
  deletePattern: (oldPattern: Pattern) => void;
  setModalMode: (
    mode: { mode: "new" } | { mode: "edit"; target: Pattern }
  ) => void;
}) {
  return (
    <div>
      <button onClick={() => setModalMode({ mode: "new" })}>Add</button>
      <ul>
        {patterns.map((pattern) => (
          <li key={pattern.name}>
            {pattern.name}
            <button
              onClick={() => setModalMode({ mode: "edit", target: pattern })}
            >
              Edit
            </button>
            <button onClick={() => deletePattern(pattern)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { ProfileManager };
