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
  async function handleVerification() {
    const response = await fetch(
      `https://liberty-arrow-api.vercel.app/email-confirmation?email=${email}`
    );
    if (!response.ok) {
      setMessage("Error while trying to verify email.");
    }
    const json = await response.json();
    if (json.verified) {
      onSubmit(email);
    }
  }
  return (
    <Modal>
      <LabelledEmailInput label="Email" value={email} onChange={setEmail} />
      <LabelledButtonInput
        label="Verify email"
        text="Verify"
        onClick={handleVerification}
      />
      {message && <span>{message}</span>}
    </Modal>
  );
}

export { EmailTokenModal };
