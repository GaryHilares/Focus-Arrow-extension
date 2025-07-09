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
  getDisplay: () => JSX.Element;

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

function getOptions(
  protectionTypes: Array<ProtectionType>
): { text: string; value: string }[] {
  return protectionTypes.map((value) => ({
    text: value.getDescriptiveString(),
    value: value.getIdString(),
  }));
}

function ProtectionTypeSelect({
  protectionTypeId,
  protectionTypes,
  setNewProtectionType,
}: {
  protectionTypeId: string;
  protectionTypes: Array<ProtectionType>;
  setNewProtectionType: (id: string) => void;
}): JSX.Element {
  return (
    <LabelledSelectInput
      value={protectionTypeId}
      onChange={setNewProtectionType}
      label="Protection type"
      options={getOptions(protectionTypes)}
    />
  );
}

class NoProtectionType implements ProtectionType {
  public constructor(
    private commitTypeAndDetails: (
      protectionId: string,
      details: ProtectionDetails
    ) => void
  ) {}

  public getDescriptiveString(): string {
    return "None";
  }

  public getIdString(): string {
    return "none";
  }

  public getDisplay(): JSX.Element {
    return null;
  }

  public needsModal(): boolean {
    return false;
  }

  public applyWithoutSubmit(): void {
    this.commitTypeAndDetails(this.getIdString(), null);
  }
}

class PasswordType implements ProtectionType {
  public constructor(
    private commitTypeAndDetails: (
      typeId: string,
      details: ProtectionDetails
    ) => void,
    private rollbackTypeAndDetails: () => void,
    private openModalWithId: (id: string) => void
  ) {}

  public getDescriptiveString(): string {
    return "Password";
  }

  public getIdString(): string {
    return "password";
  }

  public getDisplay(): JSX.Element {
    return (
      <LabelledButtonInput
        onClick={() => this.openModalWithId(this.getIdString())}
        label="Change password"
        text="Change"
      />
    );
  }

  public needsModal(): boolean {
    return true;
  }

  public getModal(): JSX.Element {
    return (
      <PasswordModal
        onSubmit={(password: string) =>
          this.commitTypeAndDetails(this.getIdString(), { password: password })
        }
        onReset={() => this.rollbackTypeAndDetails()}
      />
    );
  }
}

class EmailTokenType implements ProtectionType {
  public constructor(
    private commitTypeAndDetails: (
      typeId: string,
      details: ProtectionDetails
    ) => void,
    private rollbackTypeAndDetails: () => void,
    private openModalWithId: (id: string) => void
  ) {}

  public getDescriptiveString(): string {
    return "Email Token";
  }

  public getIdString(): string {
    return "email-token";
  }

  public getDisplay(): JSX.Element {
    return (
      <LabelledButtonInput
        onClick={() => this.openModalWithId(this.getIdString())}
        label="Change email"
        text="Change"
      />
    );
  }

  public needsModal() {
    return true;
  }

  public getModal(): JSX.Element {
    return (
      <EmailTokenModal
        onSubmit={(email: string) =>
          this.commitTypeAndDetails(this.getIdString(), { email: email })
        }
        onReset={() => this.rollbackTypeAndDetails()}
      />
    );
  }
}

function toIdDict(arr: Array<ProtectionType>): Record<string, ProtectionType> {
  const ret: Record<string, ProtectionType> = {};
  for (const el of arr) {
    ret[el.getIdString()] = el;
  }
  return ret;
}

function ProtectionForm() {
  const [protectionTypeLoaded, protectionType, setProtectionType] =
    useSyncing<string>("protectionType");
  const [protectionDetailsLoaded, protectionDetails, setProtectionDetails] =
    useSyncing<ProtectionDetails>("protectionDetails");
  const [modalShown, setModalShown] = useState<string | null>(null);
  function commitTypeAndDetails(typeId: string, details: ProtectionDetails) {
    setProtectionType(typeId);
    setProtectionDetails(details);
    setModalShown(null);
  }
  function rollbackTypeAndDetails() {
    setModalShown(null);
  }
  const protectionTypes = [
    new NoProtectionType(commitTypeAndDetails),
    new PasswordType(
      commitTypeAndDetails,
      rollbackTypeAndDetails,
      setModalShown
    ),
    new EmailTokenType(
      commitTypeAndDetails,
      rollbackTypeAndDetails,
      setModalShown
    ),
  ];
  const protectionTypesIdDict = toIdDict(protectionTypes);
  function setNewProtectionType(id: string) {
    if (protectionTypesIdDict[id].needsModal()) {
      setModalShown(id);
    } else {
      protectionTypesIdDict[id].applyWithoutSubmit();
    }
  }
  return (
    protectionTypeLoaded &&
    protectionDetailsLoaded && (
      <>
        {modalShown && protectionTypesIdDict[modalShown].getModal()}
        <ProtectionTypeSelect
          protectionTypeId={protectionType}
          protectionTypes={protectionTypes}
          setNewProtectionType={setNewProtectionType}
        />
        {protectionTypesIdDict[protectionType].getDisplay()}
      </>
    )
  );
}

export { ProtectionForm };
