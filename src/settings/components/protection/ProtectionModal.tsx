import * as React from "react";
import { useEffect, useState, useId } from "react";
import { Modal } from "../common/Modal";
import { useAutoInitialLoad } from "../../hooks/useSyncing";
import * as styles from "./ProtectionModal.module.scss";

function PasswordSpecificForm({ onSuccess }: { onSuccess: () => void }) {
  const [loaded, protectionDetails] =
    useAutoInitialLoad<any>("protectionDetails");
  const [password, setPassword] = useState<string>("");
  const passwordId = useId();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (protectionDetails.password == password) {
      onSuccess();
    }
  }

  return (
    loaded && (
      <Modal>
        <form className={styles["password-form"]} onSubmit={handleSubmit}>
          <h1>Log into Liberty Arrow</h1>
          <div className={styles["label-input-pair"]}>
            <label htmlFor={passwordId}>Password</label>
            <input
              id={passwordId}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles["button-box"]}>
            <input type="submit" />
          </div>
        </form>
      </Modal>
    )
  );
}

function ProtectionModal({ onSuccess }: { onSuccess: () => void }) {
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
    case "password":
      return <PasswordSpecificForm onSuccess={onSuccess} />;
    case "none":
    default:
      return null;
  }
}

export { ProtectionModal };
