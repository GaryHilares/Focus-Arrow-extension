import React, { useEffect, useState } from "react";

function EditModal({ patterns, addPattern, editPattern, target, closeModal }) {
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
  function handleSubmit() {
    if (target) {
      editPattern(target, { name: name, url: url });
    } else {
      addPattern({ name: name, url: url });
    }
    close();
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
