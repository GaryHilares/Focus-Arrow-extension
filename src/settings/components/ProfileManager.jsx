import React from "react";

function ProfileManager({ patterns, deletePattern, setModalMode }) {
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
