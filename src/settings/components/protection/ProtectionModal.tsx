import * as React from "react";
import { useEffect, useState } from "react";
import { Modal } from "../common/Modal";
import { useAutoInitialLoad } from "../../hooks/useSyncing";
import * as styles from "./ProtectionModal.module.scss";
import { ButtonBox, LabelledTextInput } from "../common/LabelledInputs";

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

  function handleReset() {
    window.location.replace("https://focus-arrow-api.vercel.app/");
  }

  return (
    loaded && (
      <Modal>
        <form
          className={styles["password-form"]}
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <h1>Log into Focus Arrow</h1>
          <LabelledTextInput
            value={password}
            onChange={setPassword}
            label="Password"
          />
          <ButtonBox />
        </form>
      </Modal>
    )
  );
}

function EmailSpecificForm({ onSuccess }: { onSuccess: () => void }) {
  const [loaded, protectionDetails] =
    useAutoInitialLoad<any>("protectionDetails");
  const [actualToken, setActualToken] = useState<string>(null);
  const [inputToken, setInputToken] = useState<string>("");

  useEffect(() => {
    console.log("Running effect with:", loaded, protectionDetails);
    if (loaded) {
      fetch(
        `https://focus-arrow-api.vercel.app/send-token?email=${protectionDetails.email}`
      )
        .then((response) => response.json())
        .then((json) => setActualToken(json.result));
    }
  }, [loaded]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (actualToken != null && actualToken == inputToken) {
      onSuccess();
    }
  }

  function handleReset() {
    window.location.replace("https://focus-arrow-api.vercel.app/");
  }

  return (
    loaded &&
    actualToken && (
      <Modal>
        <form
          className={styles["password-form"]}
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <h1>Log into Focus Arrow</h1>
          <LabelledTextInput
            value={inputToken}
            onChange={setInputToken}
            label="Emailed password"
          />
          <ButtonBox />
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
    case "email-token":
      return <EmailSpecificForm onSuccess={onSuccess} />;
    case "none":
    default:
      return null;
  }
}

export { ProtectionModal };
