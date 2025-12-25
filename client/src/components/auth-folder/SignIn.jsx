import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { openSignUp } from "../../store/auth-slice.js";
import PhoneInput from "../../UI/PhoneInput";
import { validatePhoneNumber } from "../../util/validator.js";

export default function SignIn() {
  const dispatch = useDispatch();
  const phoneNumber = useSelector((state) => state.auth.phoneNumber);
  const dialCode = useSelector((state) => state.auth.dialCode);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmedPhNum = phoneNumber.trim();
    const trimmedDialCode = dialCode.trim();

    if (
      trimmedPhNum &&
      trimmedDialCode &&
      validatePhoneNumber(trimmedDialCode, trimmedPhNum)
    ) {
      ///Do something.
      return;
    } else {
      setError("Enter a valid phone number.");
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit} className="page-container">
      <div className="signin-card">
        <div className="signin-text-controller">
          <h2 className="signin-title">Sign In</h2>
        </div>
        {error && (
          <p className="error">
            <span>{error}</span>{" "}
            <button onClick={() => setError("")}>❌</button>
          </p>
        )}
        <PhoneInput errCallback={setError} />
        <div className="btn-controller">
          <button className="btn btn-signin">Sign In</button>
        </div>
        <div className="auth-nav-controller">
          <p className="auth-nav-text">New user?</p>
          <button
            onClick={() => dispatch(openSignUp())}
            className="auth-nav-btn"
          >
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
}
