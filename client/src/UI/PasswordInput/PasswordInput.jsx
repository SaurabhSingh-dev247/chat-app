import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import styles from "./PasswordInput.module.css";
import { useSelector } from "react-redux";

export default function PasswordInput({ id, label, ...props }) {
  const [hidden, setHidden] = useState(true);
  const signInOpen = useSelector((state) => state.auth.isSignInOpen);

  function handleSelect() {
    setHidden((prevValue) => !prevValue);
  }

  return (
    <p className={styles["input-controller"]}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={hidden ? "password" : "text"} {...props} />
      <button
        className={`${styles["eye"]} ${
          signInOpen ? styles["eye-signIn"] : styles["eye-signUp"]
        }`}
        type="button"
        onClick={handleSelect}
        aria-label={hidden ? "Hide password" : "Show password"}
      >
        {hidden ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </p>
  );
}
