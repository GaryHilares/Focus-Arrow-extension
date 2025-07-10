import * as React from "react";
import { useState } from "react";
import { Modal } from "../common/Modal";
import {
  ButtonBox,
  LabelledButtonInput,
  LabelledEmailInput,
} from "../common/LabelledInputs";

function EmailTokenModal({
  onSubmit,
  onReset,
}: {
  onSubmit: (email: string) => void;
  onReset: () => void;
}) {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  async function sendVerificationEmail() {
    const response = await fetch(
      `https://focusarrow.app/send-verification?email=${email}`
    );
    if (!response.ok) {
      setMessage("Error while trying to verify email.");
    }
  }
  async function checkVerification(e: React.FormEvent) {
    e.preventDefault();
    const response = await fetch(
      `https://focusarrow.app/check-email?email=${email}`
    );
    if (!response.ok) {
      setMessage("Error while trying to check if email was verified.");
    }
    const json = await response.json();
    if (json.confirmed) {
      onSubmit(email);
    } else {
      setMessage("Error: Email has to be verified.");
    }
  }
  return (
    <Modal>
      <form onSubmit={checkVerification} onReset={onReset}>
        <LabelledEmailInput label="Email" value={email} onChange={setEmail} />
        <LabelledButtonInput
          label="Send verification email"
          text="Send"
          onClick={sendVerificationEmail}
        />
        {message && <span>{message}</span>}
        <ButtonBox />
      </form>
    </Modal>
  );
}

export { EmailTokenModal };
