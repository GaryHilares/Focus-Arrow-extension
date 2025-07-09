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
        type="text"
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles["text-input"]}
      />
    </div>
  );
}

interface LabelledEmailInputProps {
  value: string;
  onChange: (newValue: string) => void;
  label: string;
}

function LabelledEmailInput({
  value,
  onChange,
  label,
}: LabelledEmailInputProps) {
  const inputId = useId();
  return (
    <div className={styles.wrapper}>
      <label htmlFor={inputId}>{label}</label>
      <input
        type="email"
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles["email-input"]}
      />
    </div>
  );
}

interface LabelledUrlInputProps {
  value: string;
  onChange: (newValue: string) => void;
  label: string;
}

function LabelledUrlInput({ value, onChange, label }: LabelledUrlInputProps) {
  const inputId = useId();
  return (
    <div className={styles.wrapper}>
      <label htmlFor={inputId}>{label}</label>
      <input
        type="url"
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles["url-input"]}
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
        className={styles["select-input"]}
      >
        {options.map(({ text, value }) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
}

interface LabelledTimeInputProps {
  value: string;
  onChange: (newValue: string) => void;
  label: string;
}

function LabelledTimeInput({ value, onChange, label }: LabelledTimeInputProps) {
  const inputId = useId();
  return (
    <div className={styles.wrapper}>
      <label htmlFor={inputId}>{label}</label>
      <input
        type="time"
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles["time-input"]}
      />
    </div>
  );
}

interface LabelledButtonInputProps {
  text: string;
  onClick: () => void;
  label: string;
}

function LabelledButtonInput({
  text,
  onClick,
  label,
}: LabelledButtonInputProps) {
  const inputId = useId();
  return (
    <div className={styles.wrapper}>
      <label htmlFor={inputId}>{label}</label>
      <input
        className={styles["button-input"]}
        type="button"
        id={inputId}
        value={text}
        onClick={onClick}
      />
    </div>
  );
}

interface LabelledCheckBoxInputProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

function LabelledCheckBoxInput({
  checked,
  onChange,
  label,
}: LabelledCheckBoxInputProps) {
  const inputId = useId();
  return (
    <div className={styles.wrapper}>
      <label htmlFor={inputId}>{label}</label>
      <input
        className={styles["button-input"]}
        type="checkbox"
        id={inputId}
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onChange(event.target.checked);
        }}
      />
    </div>
  );
}

function ButtonBox() {
  return (
    <div className={styles["button-box"]}>
      <input
        className={styles["button-box-submit"]}
        type="submit"
        value="Accept"
      />
      <input
        className={styles["button-box-reset"]}
        type="reset"
        value="Cancel"
      />
    </div>
  );
}

export {
  LabelledTextInput,
  LabelledEmailInput,
  LabelledUrlInput,
  LabelledSelectInput,
  LabelledTimeInput,
  LabelledButtonInput,
  LabelledCheckBoxInput,
  ButtonBox,
};
