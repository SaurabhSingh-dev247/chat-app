import styles from "./Verification.module.css";
import OtpInput from "../../UI/otp-input/OtpInput.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { decrementCouter } from "../../store/UI-slice.js";
import { stringIterator } from "../../util/iterator.js";

export default function Verification() {
  const counter = useSelector((state) => state.ui.counter);
  const dialCode = useSelector((state) => state.auth.dialCode);
  const phoneNumber = useSelector((state) => state.auth.phoneNumber);
  const dispatch = useDispatch();

  const phoneNumberLength = phoneNumber.length;
  const blurLength = phoneNumberLength - 2;
  const blurredPhoneNumber = stringIterator(phoneNumber, blurLength);
  const blurredFullPhoneNumber = dialCode + blurredPhoneNumber;

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(decrementCouter());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles["verification-container"]}>
      <div className={styles["verification-illustration"]}>
        <h2>Verify Otp</h2>
        <p>Enter the otp send on your mobile number {phoneNumber.length > 0 ?blurredFullPhoneNumber: "+91XXXXXXXX28"}</p>
      </div>
      <OtpInput />
      <div className={styles["counter-wrapper"]}>
        {counter !== 0 && (
          <p className={styles.counter}>
            <span className={styles["counter-text"]}>
              {" "}
              Request new otp after:{" "}
            </span>
            <span className={styles["counter-time"]}>
              {" "}
              {counter >= 60
                ? `01:${counter - 60 >= 10 ? counter - 60 : `0${counter - 60}`}`
                : `00:${counter >= 10 ? counter : "0" + counter}`}{" "}
            </span>
            <span className={styles["counter-time"]}>
              {counter < 60 ? "seconds" : "minutes"}
            </span>
          </p>
        )}
        {counter === 0 && <button className={styles.resendBtn}>Resend</button>}
      </div>
      <button className={styles["verify-button"]}>Verify</button>
    </div>
  );
}
