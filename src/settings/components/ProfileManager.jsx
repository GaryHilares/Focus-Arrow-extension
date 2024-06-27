import React from "react";

function ProfileManager({ patterns, deletePattern, setModalTarget }) {
  return (
    <div>
      <button onClick={() => setModalTarget({ mode: "new" })}>Add</button>
      <ul>
        {patterns.map((pattern) => (
          <li key={pattern.name}>
            {pattern.name}
            <button
              onClick={() => setModalTarget({ mode: "edit", target: pattern })}
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
