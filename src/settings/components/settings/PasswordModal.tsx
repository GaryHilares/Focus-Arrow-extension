import * as React from "react";
import { useState } from "react";
import { Modal } from "../common/Modal";
import {
  ButtonBox,
  LabelledButtonInput,
  LabelledTextInput,
} from "../common/LabelledInputs";

function PasswordModal({
  onSubmit,
  onReset,
}: {
  onSubmit: (password: string) => void;
  onReset: () => void;
}) {
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length == 0) {
      setMessage("Password cannot be empty!");
    } else {
      onSubmit(password);
    }
  }
  return (
    <Modal>
      <form onSubmit={handleSubmit} onReset={onReset}>
        <LabelledTextInput
          value={password}
          onChange={setPassword}
          label="Password"
        />
        {message && <span>{message}</span>}
        <ButtonBox />
      </form>
    </Modal>
  );
}

export { PasswordModal };
