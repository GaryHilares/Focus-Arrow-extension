import * as React from "react";
import { useState } from "react";
import { Modal } from "../common/Modal";
import {
  LabelledButtonInput,
  LabelledEmailInput,
} from "../common/LabelledInputs";

function EmailTokenModal({ onSubmit }: { onSubmit: (email: string) => void }) {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  async function sendVerificationEmail() {
    const response = await fetch(
      `https://liberty-arrow-api.vercel.app/send-verification?email=${email}`
    );
    if (!response.ok) {
      setMessage("Error while trying to verify email.");
    }
  }
  async function checkVerification() {
    const response = await fetch(
      `https://liberty-arrow-api.vercel.app/check-email?email=${email}`
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
      <LabelledEmailInput label="Email" value={email} onChange={setEmail} />
      <LabelledButtonInput
        label="Send verification email"
        text="Send"
        onClick={sendVerificationEmail}
      />
      <LabelledButtonInput
        label="Verify email"
        text="Verify"
        onClick={checkVerification}
      />
      {message && <span>{message}</span>}
    </Modal>
  );
}

export { EmailTokenModal };
