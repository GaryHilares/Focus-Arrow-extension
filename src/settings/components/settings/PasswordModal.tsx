import * as React from "react";
import { useState } from "react";
import { Modal } from "../common/Modal";
import {
  LabelledButtonInput,
  LabelledTextInput,
} from "../common/LabelledInputs";

function PasswordModal({ onSubmit }: { onSubmit: (password: string) => void }) {
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  function handleSubmit() {
    if (password.length == 0) {
      setMessage("Password cannot be empty!");
    } else {
      onSubmit(password);
    }
  }
  return (
    <Modal>
      <LabelledTextInput
        value={password}
        onChange={setPassword}
        label="Password"
      />
      <LabelledButtonInput onClick={handleSubmit} label="Save" text="Submit" />
      {message && <span>{message}</span>}
    </Modal>
  );
}

export { PasswordModal };
