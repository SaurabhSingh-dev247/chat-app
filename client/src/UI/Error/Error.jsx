import styles from "./Error.module.css";

export default function Error({ error, onClose }) {
  const errClass = `${styles.error} ${styles["error-slide-in"]}`;

  return (
    <p className={errClass}>
      <span>{error}</span>
      <button onClick={onClose}>❌</button>
    </p>
  );
}
