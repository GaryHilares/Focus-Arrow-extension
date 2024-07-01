import * as React from "react";
import { useSyncing } from "../hooks/useSyncing";

export function ProtectionForm() {
  const [loaded, protectionType, setProtectionType] =
    useSyncing<string>("protectionType");

  if (!loaded) {
    return null;
  }

  return (
    <>
      <select
        value={protectionType}
        onChange={(e) => setProtectionType(e.target.value)}
      >
        <option value="none">None</option>
        <option value="button">Button</option>
      </select>
    </>
  );
}
