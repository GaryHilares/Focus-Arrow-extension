import * as React from "react";
import { useState } from "react";
import { useSyncing } from "../hooks/useSyncing";

export function SettingsEditor() {
  const [theme, setTheme] = useState<string>();
  const loaded = useSyncing<string>("theme", theme, setTheme, "default");

  if (!loaded) {
    return null;
  }

  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="default">Default</option>
      <option value="minimalist">Minimalist</option>
    </select>
  );
}
