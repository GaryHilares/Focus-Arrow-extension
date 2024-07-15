import * as React from "react";
import { useEffect } from "react";
import { useSyncing } from "../../hooks/useSyncing";
import {
  LabelledTextInput,
  LabelledSelectInput,
} from "../common/LabelledInputs";

interface PasswordDetails {
  password: string;
}

type ProtectionDetails = PasswordDetails | null;

interface PasswordSpecificFormProps {
  data: PasswordDetails;
  setData: (newData: PasswordDetails) => void;
}

function PasswordSpecificForm({ data, setData }: PasswordSpecificFormProps) {
  return (
    <LabelledTextInput
      value={data.password}
      onChange={(newValue) => setData({ password: newValue })}
      label="Password"
    />
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

  return (
    loaded && (
      <>
        <LabelledSelectInput
          value={protectionType}
          onChange={setProtectionType}
          label="Protection type"
          options={[
            { text: "None", value: "none" },
            { text: "Password", value: "password" },
          ]}
        />
        <ProtectionSpecificForm protectionType={protectionType} />
      </>
    )
  );
}

export { ProtectionForm };
