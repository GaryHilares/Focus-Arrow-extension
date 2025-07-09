import * as React from "react";
import { useSyncing } from "../../hooks/useSyncing";
import { LabelledUrlInput } from "../common/LabelledInputs";

function ThemeForm() {
  const [loaded, theme, setTheme] = useSyncing<string>("theme");

  return (
    loaded && (
      <LabelledUrlInput
        value={theme}
        onChange={setTheme}
        label="Redirection page"
      />
    )
  );
}

export { ThemeForm };
