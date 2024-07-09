import * as React from "react";
import * as styles from "./Modal.module.scss";

export function Modal({ children }: { children: any }) {
  return (
    <div className={styles["modal-wrapper"]}>
      <div className={styles.modal}>{children}</div>
    </div>
  );
}
