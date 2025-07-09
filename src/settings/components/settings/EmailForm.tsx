import * as React from "react";
import { setUninstallEmailAddress, useSyncing } from "../../hooks/useSyncing";
import { useState } from "react";
import {
  ButtonBox,
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
  function handleSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    onSubmit(email);
  }
  return (
    <Modal>
      <form onSubmit={handleSubmit} onReset={closeModal}>
        <LabelledEmailInput value={email} onChange={setEmail} label="Email" />
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
