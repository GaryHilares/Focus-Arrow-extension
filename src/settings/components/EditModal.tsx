import * as React from "react";
import { useState, useEffect } from "react";

type Pattern = { name: string; url: string };

function EditModal({
  patterns,
  addPattern,
  editPattern,
  target,
  closeModal,
}: {
  patterns: Pattern[];
  addPattern: (pattern: Pattern) => void;
  editPattern: (oldPattern: Pattern, newPattern: Pattern) => void;
  target: Pattern;
  closeModal: () => void;
}) {
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
    <form onSubmit={handleSubmit} onReset={close}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      <input type="submit" />
      <input type="reset" />
    </form>
  );
}

export { EditModal };
