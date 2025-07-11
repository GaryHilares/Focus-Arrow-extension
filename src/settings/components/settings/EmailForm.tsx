import * as React from "react";
import { setUninstallEmailAddress, useSyncing } from "../../hooks/useSyncing";
import { useState } from "react";
import {
  ButtonBox,
  LabelledButtonInput,
  LabelledCheckBoxInput,
  LabelledEmailInput,
} from "../common/LabelledInputs";
import { Modal } from "../common/Modal";

function EmailModal({
  onSubmit,
  closeModal,
}: {
  onSubmit: (email: string) => void;
  closeModal: () => void;
}) {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  async function handleSubmit(e: React.FormEvent<HTMLElement>) {
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
  async function sendVerificationEmail() {
    const response = await fetch(
      `https://focusarrow.app/send-verification?email=${email}`
    );
    if (!response.ok) {
      setMessage("Error while trying to verify email.");
    }
  }
  return (
    <Modal>
      <form onSubmit={handleSubmit} onReset={closeModal}>
        <LabelledEmailInput value={email} onChange={setEmail} label="Email" />
        <LabelledButtonInput
          text="Send"
          onClick={sendVerificationEmail}
          label="Send verification email"
        />
        {message && <span>{message}</span>}
        <ButtonBox />
      </form>
    </Modal>
  );
}

function EmailForm() {
  const [loaded, email, setEmail] = useSyncing<string | null>("email");
  const [showModal, setShowModal] = useState<boolean>(false);
  function handleModalSubmit(email: string) {
    setEmail(email);
    setUninstallEmailAddress(email);
    setShowModal(false);
  }

  return (
    loaded && (
      <>
        {showModal && (
          <EmailModal
            onSubmit={handleModalSubmit}
            closeModal={() => setShowModal(false)}
          />
        )}
        <LabelledCheckBoxInput
          label="Send email on uninstallation"
          checked={email !== null}
          onChange={(checked: boolean) => {
            if (checked) {
              setShowModal(true);
            } else {
              setEmail(null);
            }
          }}
        />
      </>
    )
  );
}

export { EmailForm };
