import * as React from "react";
import { ProtectionForm } from "./ProtectionForm";
import { ThemeForm } from "./ThemeForm";
import { EmailForm } from "./EmailForm";

function SettingsEditor() {
  return (
    <section>
      <ThemeForm />
      <ProtectionForm />
      <EmailForm />
    </section>
  );
}

export { SettingsEditor };
