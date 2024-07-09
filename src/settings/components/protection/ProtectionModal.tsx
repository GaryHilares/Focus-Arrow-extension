import * as React from "react";
import { useEffect, useState } from "react";
import { Modal } from "../common/Modal";
import { useAutoInitialLoad } from "../../hooks/useSyncing";

function PasswordSpecificForm({ onSuccess }: { onSuccess: () => void }) {
  const [loaded, protectionDetails] =
    useAutoInitialLoad<any>("protectionDetails");
  const [password, setPassword] = useState<string>("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (protectionDetails.password == password) {
      onSuccess();
    }
  }

  return (
    loaded && (
      <Modal>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" />
        </form>
      </Modal>
    )
  );
}

export function ProtectionModal({ onSuccess }: { onSuccess: () => void }) {
  const [loaded, protectionType] = useAutoInitialLoad<string>("protectionType");
  useEffect(() => {
    if (protectionType === "none") {
      onSuccess();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  switch (protectionType) {
    case "button":
      return <button onClick={onSuccess}>Log In</button>;
    case "password":
      return <PasswordSpecificForm onSuccess={onSuccess} />;
    case "none":
    default:
      return null;
  }
}
