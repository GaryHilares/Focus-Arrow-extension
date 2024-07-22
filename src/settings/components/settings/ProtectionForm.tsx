import * as React from "react";
import { useEffect } from "react";
import { useSyncing } from "../../hooks/useSyncing";
import {
  LabelledTextInput,
  LabelledSelectInput,
  LabelledButtonInput,
} from "../common/LabelledInputs";

interface PasswordDetails {
  password: string;
}

interface EmailTokenDetails {
  email: string;
}

type ProtectionDetails = PasswordDetails | EmailTokenDetails | null;

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

interface EmailTokenSpecificFormProps {
  data: EmailTokenDetails;
  setData: (newData: EmailTokenDetails) => void;
}

function EmailTokenSpecificForms({
  data,
  setData,
}: EmailTokenSpecificFormProps) {
  return (
    <>
      <LabelledTextInput
        value={data.email}
        onChange={(newValue) => setData({ email: newValue })}
        label="Password"
      />
      <LabelledButtonInput
        text="Send"
        onClick={() =>
          fetch(
            `https://liberty-arrow-api.vercel.app/email-confirmation?email=${data.email}`
          )
        }
        label="Send verification email"
      />
    </>
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
      case "email-token":
        setProtectionDetails({ email: "" });
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
        "password" in protectionDetails && (
          <PasswordSpecificForm
            data={protectionDetails}
            setData={setProtectionDetails}
          />
        )
      );
    case "email-token":
      return (
        loaded &&
        protectionDetails &&
        "email" in protectionDetails && (
          <EmailTokenSpecificForms
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
            { text: "Email token", value: "email-token" },
          ]}
        />
        <ProtectionSpecificForm protectionType={protectionType} />
      </>
    )
  );
}

export { ProtectionForm };
