import * as React from "react";
import { ProtectionForm } from "./ProtectionForm";
import { ThemeForm } from "./ThemeForm";

export function SettingsEditor() {
  return (
    <>
      <ThemeForm />
      <ProtectionForm />
    </>
  );
}
