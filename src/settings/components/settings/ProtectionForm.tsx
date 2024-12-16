import * as React from "react";
import { useState } from "react";
import { useSyncing } from "../../hooks/useSyncing";
import {
  LabelledButtonInput,
  LabelledSelectInput,
} from "../common/LabelledInputs";
import { PasswordModal } from "./PasswordModal";
import { EmailTokenModal } from "./EmailTokenModal";

interface PasswordDetails {
  password: string;
}

interface EmailTokenDetails {
  email: string;
}

type ProtectionDetails = PasswordDetails | EmailTokenDetails | null;

/**
 * Interface representing information about the form for a particular
 * protection type.
 */
interface ProtectionType {
  /**
   * Produces a user-friendly descriptive name for this protection type.
   * @returns A user-friendly descriptive name for this protection type.
   */
  getDescriptiveString: () => string;

  /**
   * Produces the internal ID for this protection type.
   * @returns The internal ID for this protection type.
   */
  getIdString: () => string;

  /**
   * Produces an element to be displayed in the form
   * @returns An element to be displayed in the form.
   */
  getDisplay: () => JSX.Element | null;

  /**
   * Represents whether this protection type uses a modal to atomically submit
   * information when it is selected.
   *
   * `needsModal` must always produce either `true` or `false` for a
   * particular implementation. `getModal` must be present iff
   * `needsModal` produces true. `applyWithoutSubmit` must be present iff
   * `needsModal` produces false.
   * @returns True if this protection type uses a modal to atomically submit
   *          information when it is selected, false otherwise.
   */
  needsModal: () => boolean;

  /**
   * Produces a modal to input information about this protection type.
   * @returns A modal to input information about this protection type.
   */
  getModal?: () => JSX.Element;

  /**
   * Applies changes without requiring the user to interactively submit a
   * modal.
   */
  applyWithoutSubmit?: () => void;
}

class ProtectionTypeContext {
  private protectionTypes: { [key: string]: ProtectionType };
  private currentOption: string;

  constructor(defaultOption: string, newProtectionTypes: ProtectionType[]) {
    this.currentOption = defaultOption;
    this.protectionTypes = {};
    for (const element of newProtectionTypes) {
      this.protectionTypes[element.getIdString()] = element;
    }
  }

  requestDescriptiveString(): string {
    return this.protectionTypes[this.currentOption].getDescriptiveString();
  }

  requestIdString(): string {
    return this.protectionTypes[this.currentOption].getIdString();
  }

  requestForm(): JSX.Element {
    return this.protectionTypes[this.currentOption].getDisplay();
  }

  requestModal(): JSX.Element {
    return this.protectionTypes[this.currentOption].getModal();
  }

  getOptions(): { text: string; value: string }[] {
    return Object.keys(this.protectionTypes).map((key) => ({
      text: this.protectionTypes[key].getDescriptiveString(),
      value: this.protectionTypes[key].getIdString(),
    }));
  }

  getSelectedOptionId(): string {
    return this.currentOption;
  }

  copyAndSetOptionId(protectionTypeId: string): ProtectionTypeContext {
    let newProtectionTypeList = new ProtectionTypeContext(
      this.currentOption,
      Object.values(this.protectionTypes)
    );
    newProtectionTypeList.currentOption = protectionTypeId;
    return newProtectionTypeList;
  }

  getSelectComponent(
    onChange: (newValue: ProtectionTypeContext) => void,
    setShowModal: (showModal: boolean) => void
  ): JSX.Element {
    return (
      <LabelledSelectInput
        value={this.getSelectedOptionId()}
        onChange={(id) => {
          if (this.protectionTypes[id].needsModal()) {
            setShowModal(true);
          } else {
            this.protectionTypes[id].applyWithoutSubmit();
          }
          onChange(this.copyAndSetOptionId(id));
        }}
        label="Protection type"
        options={this.getOptions()}
      />
    );
  }
}

class NoProtectionType implements ProtectionType {
  constructor(private onSubmit: (protectionId: string) => void) {}
  getDescriptiveString(): string {
    return "None";
  }
  getIdString(): string {
    return "none";
  }
  getDisplay(): JSX.Element | null {
    return null;
  }
  needsModal(): boolean {
    return false;
  }
  applyWithoutSubmit(): void {
    this.onSubmit(this.getIdString());
  }
}

class PasswordType implements ProtectionType {
  constructor(
    private openModal: () => void,
    private onSubmit: (protectionId: string, password: string) => void
  ) {}
  getDescriptiveString(): string {
    return "Password";
  }
  getIdString(): string {
    return "password";
  }
  getDisplay(): JSX.Element | null {
    return (
      <LabelledButtonInput
        onClick={() => this.openModal()}
        label="Change password"
        text="Change"
      />
    );
  }
  needsModal(): boolean {
    return true;
  }
  getModal(): JSX.Element | null {
    return (
      <PasswordModal
        onSubmit={(password: string) =>
          this.onSubmit(this.getIdString(), password)
        }
      />
    );
  }
}

class EmailTokenType implements ProtectionType {
  constructor(
    private openModal: () => void,
    private onSubmit: (protectionId: string, email: string) => void
  ) {}
  getDescriptiveString(): string {
    return "Email Token";
  }
  getIdString(): string {
    return "email-token";
  }
  getDisplay(): JSX.Element | null {
    return (
      <LabelledButtonInput
        onClick={() => this.openModal()}
        label="Change email"
        text="Change"
      />
    );
  }
  needsModal() {
    return true;
  }
  getModal(): JSX.Element | null {
    return (
      <EmailTokenModal
        onSubmit={(email: string) => this.onSubmit(this.getIdString(), email)}
      />
    );
  }
}

function ProtectionForm() {
  const [protectionTypeLoaded, protectionType, setProtectionType] =
    useSyncing<string>("protectionType");
  const [protectionDetailsLoaded, protectionDetails, setProtectionDetails] =
    useSyncing<ProtectionDetails>("protectionDetails");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [protectionTypeContext, setProtectionTypeContext] =
    useState<ProtectionTypeContext | null>(null);
  React.useEffect(() => {
    if (
      protectionTypeLoaded &&
      protectionDetailsLoaded &&
      !protectionTypeContext
    ) {
      setProtectionTypeContext(
        new ProtectionTypeContext(protectionType, [
          new NoProtectionType((protectionId) => {
            setProtectionType(protectionId);
            setProtectionDetails(null);
          }),
          new PasswordType(
            () => {
              setShowModal(true);
            },
            (protectionId: string, password: string) => {
              setProtectionType(protectionId);
              setProtectionDetails({ password: password });
              setShowModal(false);
            }
          ),
          new EmailTokenType(
            () => {
              setShowModal(true);
            },
            (protectionId: string, email: string) => {
              setProtectionType(protectionId);
              setProtectionDetails({ email: email });
              setShowModal(false);
            }
          ),
        ])
      );
    }
  }, [protectionTypeLoaded, protectionDetailsLoaded]);
  return (
    protectionTypeLoaded &&
    protectionDetailsLoaded &&
    protectionTypeContext && (
      <>
        {showModal && protectionTypeContext.requestModal()}
        {protectionTypeContext.getSelectComponent(
          setProtectionTypeContext,
          setShowModal
        )}
        {protectionTypeContext.requestForm()}
      </>
    )
  );
}

export { ProtectionForm };
