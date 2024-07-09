import * as React from "react";
import { useEffect, useId } from "react";
import { useSyncing } from "../../hooks/useSyncing";
import * as styles from "./ProtectionForm.module.scss";

interface PasswordDetails {
  password: string;
}

type ProtectionDetails = PasswordDetails | null;

interface PasswordSpecificFormProps {
  data: PasswordDetails;
  setData: (newData: PasswordDetails) => void;
}

function PasswordSpecificForm({ data, setData }: PasswordSpecificFormProps) {
  const passwordId = useId();
  return (
    <div className={styles["label-input-pair"]}>
      <label htmlFor={passwordId}>Password</label>
      <input
        id={passwordId}
        type="text"
        value={data.password}
        onChange={(e) => setData({ password: e.target.value })}
      />
    </div>
  );
}

interface ProtectionSpecificFormProps {
  protectionType: string;
}

function ProtectionSpecificForm({
  protectionType,
}: ProtectionSpecificFormProps) {
  const [loaded, protectionDetails, setProtectionDetails] =
    useSyncing<ProtectionDetails>("protectionDetails");

  useEffect(() => {
    switch (protectionType) {
      case "password":
        setProtectionDetails({ password: "" });
        break;
      case "button":
      case "none":
      default:
        break;
    }
  }, [protectionType, loaded]);

  switch (protectionType) {
    case "password":
      return (
        loaded &&
        protectionDetails &&
        protectionDetails.password !== undefined && (
          <PasswordSpecificForm
            data={protectionDetails}
            setData={setProtectionDetails}
          />
        )
      );
    default:
      return null;
  }
}

function ProtectionForm() {
  const [loaded, protectionType, setProtectionType] =
    useSyncing<string>("protectionType");
  const protectionTypeId = useId();

  return (
    loaded && (
      <>
        <div className={styles["label-input-pair"]}>
          <label htmlFor={protectionTypeId}>Protection type</label>
          <select
            value={protectionType}
            onChange={(e) => setProtectionType(e.target.value)}
          >
            <option value="none">None</option>
            <option value="button">Button</option>
            <option value="password">Password</option>
          </select>
        </div>
        <ProtectionSpecificForm protectionType={protectionType} />
      </>
    )
  );
}

export { ProtectionForm };
