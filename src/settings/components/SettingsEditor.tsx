import * as React from "react";
import { useSyncing } from "../hooks/useSyncing";

export function SettingsEditor() {
  const [themeLoaded, theme, setTheme] = useSyncing<string>("theme");
  const [protectionTypeLoaded, protectionType, setProtectionType] =
    useSyncing<string>("protectionType");

  if (!themeLoaded || !protectionTypeLoaded) {
    return null;
  }

  return (
    <>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="default">Default</option>
        <option value="minimalist">Minimalist</option>
      </select>
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
