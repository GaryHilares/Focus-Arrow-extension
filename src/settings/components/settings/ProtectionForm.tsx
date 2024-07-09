import * as React from "react";
import { useEffect } from "react";
import { useSyncing } from "../../hooks/useSyncing";

interface PasswordDetails {
  password: string;
}

type ProtectionDetails = PasswordDetails | null;

function PasswordSpecificForm({
  data,
  setData,
}: {
  data: PasswordDetails;
  setData: (newData: PasswordDetails) => void;
}) {
  return (
    <input
      type="text"
      value={data.password}
      onChange={(e) => setData({ password: e.target.value })}
    />
  );
}

function ProtectionSpecificForm({
  protectionType,
}: {
  protectionType: string;
}) {
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

export function ProtectionForm() {
  const [loaded, protectionType, setProtectionType] =
    useSyncing<string>("protectionType");

  return (
    loaded && (
      <>
        <select
          value={protectionType}
          onChange={(e) => setProtectionType(e.target.value)}
        >
          <option value="none">None</option>
          <option value="button">Button</option>
          <option value="password">Password</option>
        </select>
        <ProtectionSpecificForm protectionType={protectionType} />
      </>
    )
  );
}
