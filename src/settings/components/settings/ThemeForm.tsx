import * as React from "react";
import { useSyncing } from "../../hooks/useSyncing";
import { LabelledSelectInput } from "../common/LabelledInputs";

function ThemeForm() {
  const [loaded, theme, setTheme] = useSyncing<string>("theme");

  return (
    loaded && (
      <LabelledSelectInput
        value={theme}
        onChange={setTheme}
        label="Theme"
        options={[
          { text: "Default", value: "default" },
          { text: "Minimalist", value: "minimalist" },
        ]}
      />
    )
  );
}

export { ThemeForm };
