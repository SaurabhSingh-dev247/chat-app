import { useState, useRef } from "react";
import styles from "./OtpInput.module.css";

export default function OtpInput() {
  const inputs = useRef([]);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const length = otp.length;
  
  const handleChange = (e, index) => {
    const { value } = e.target;

    if (value.match(/^\d$/)) {
      if (index < length - 1) {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        inputs.current[index + 1].focus();
      }

      if (index === length - 1) {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        inputs.current[index].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
      if (index === 0) {
        inputs.current[index].focus();
      }
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      if (index !== length - 1) {
        inputs.current[index + 1].focus();
      } else {
        inputs.current[index].focus();
      }
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      if (index !== 0) {
        inputs.current[index - 1].focus();
      } else {
        inputs.current[index].focus();
      }
    }
  };

  return (
    <div className={styles["otp-input-container"]}>
      {otp.map((otpValue, index) => {
        return (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={otpValue}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputs.current[index] = el)}
          />
        );
      })}
    </div>
  );
}
