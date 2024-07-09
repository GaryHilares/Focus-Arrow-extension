import * as React from "react";
import { useSyncing } from "../../hooks/useSyncing";

function ThemeForm() {
  const [loaded, theme, setTheme] = useSyncing<string>("theme");

  if (!loaded) {
    return null;
  }

  return (
    <>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="default">Default</option>
        <option value="minimalist">Minimalist</option>
      </select>
    </>
  );
}

export { ThemeForm };
