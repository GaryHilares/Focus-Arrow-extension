import * as React from "react";
import { ProtectionForm } from "./ProtectionForm";
import { ThemeForm } from "./ThemeForm";

function SettingsEditor() {
  return (
    <>
      <ThemeForm />
      <ProtectionForm />
    </>
  );
}

export { SettingsEditor };
