import * as React from "react";
import { useId } from "react";
import { useSyncing } from "../../hooks/useSyncing";
import * as styles from "./ThemeForm.module.scss";

function ThemeForm() {
  const [loaded, theme, setTheme] = useSyncing<string>("theme");
  const themeId = useId();

  if (!loaded) {
    return null;
  }

  return (
    <div className={styles["label-input-pair"]}>
      <label htmlFor={themeId}>Theme</label>
      <select
        id={themeId}
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
        <option value="default">Default</option>
        <option value="minimalist">Minimalist</option>
      </select>
    </div>
  );
}

export { ThemeForm };
