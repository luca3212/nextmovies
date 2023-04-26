import React from "react";
import Logo from "./icons/logo";
import styles from "../styles/spinner.module.scss";

export default function Spinner() {
  return (
    <div className={styles.spinner}>
      <Logo />
    </div>
  );
}
