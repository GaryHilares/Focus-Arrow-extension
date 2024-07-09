import * as React from "react";
import { ProtectionForm } from "./ProtectionForm";
import { ThemeForm } from "./ThemeForm";

function SettingsEditor() {
  return (
    <section>
      <ThemeForm />
      <ProtectionForm />
    </section>
  );
}

export { SettingsEditor };
