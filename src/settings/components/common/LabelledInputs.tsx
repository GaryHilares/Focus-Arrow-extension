import * as React from "react";
import { useId } from "react";
import * as styles from "./LabelledInputs.module.scss";

interface LabelledTextInputProps {
  value: string;
  onChange: (newValue: string) => void;
  label: string;
}

function LabelledTextInput({ value, onChange, label }: LabelledTextInputProps) {
  const inputId = useId();
  return (
    <div className={styles.wrapper}>
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

interface LabelledSelectInputProps {
  value: string;
  onChange: (newValue: string) => void;
  label: string;
  options: { text: string; value: string }[];
}

function LabelledSelectInput({
  value,
  onChange,
  label,
  options,
}: LabelledSelectInputProps) {
  const inputId = useId();
  return (
    <div className={styles.wrapper}>
      <label htmlFor={inputId}>{label}</label>
      <select
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(({ text, value }) => (
          <option value={value}>{text}</option>
        ))}
      </select>
    </div>
  );
}

export { LabelledTextInput, LabelledSelectInput };
