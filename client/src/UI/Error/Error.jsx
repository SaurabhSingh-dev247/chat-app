import styles from "./Error.module.css";
import { useState } from "react";

export default function Error({ error, onClose }) {
  // In your component
  const [isClosing, setIsClosing] = useState(false);
  const errClass = `${styles.error} ${
    isClosing ? styles["error-slide-out"] : styles["error-slide-in"]
  }`;

  const handleClose = () => {
    onClose();
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
    }, 300); // Match animation duration
  };

  return (
    <p className={errClass}>
      <span>{error}</span>
      <button onClick={handleClose}>❌</button>
    </p>
  );
}
