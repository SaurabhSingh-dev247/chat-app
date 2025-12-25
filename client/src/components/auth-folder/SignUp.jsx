import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Input from "../../UI/Input";
import { openSignIn } from "../../store/auth-slice";
import PhoneInput from "../../UI/PhoneInput";
import { validatePhoneNumber, isValidEmail } from "../../util/validator.js";

export default function SignUp() {
  const dispatch = useDispatch();
  const dialCode = useSelector((state) => state.auth.dialCode);
  const phoneNumber = useSelector((state) => state.auth.phoneNumber);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (
      email.trim() !== "" &&
      userName.trim() !== "" &&
      dialCode.trim() !== "" &&
      phoneNumber.trim() !== "" &&
      isValidEmail(email) &&
      validatePhoneNumber(dialCode, phoneNumber)
    ) {
      //Do something
      return;
    } else {
      setError("Enter valid credentials.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="page-container">
      <div className="signup-card">
        <div className="signup-text-controller">
          <h2 className="signup-title">Sign Up</h2>
        </div>
        {error && (
          <p className="error">
            <span>{error}</span>{" "}
            <button onClick={() => setError("")}>❌</button>
          </p>
        )}
        <div className="input-container">
          <div className="input-group">
            <Input
              id="user-name"
              label="User Name:"
              placeholder="john doe"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                setError("");
              }}
            />
            <Input
              id="email"
              label="Email:"
              placeholder="test@test.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
          </div>
          <PhoneInput errCallback={setError} />
        </div>
        <div className="btn-controller">
          <button className="btn btn-signin">Sign Up</button>
        </div>
        <div className="auth-nav-controller">
          <p className="auth-nav-text">Already an user?</p>
          <button
            onClick={() => dispatch(openSignIn())}
            className="auth-nav-btn"
          >
            Sign In
          </button>
        </div>
      </div>
    </form>
  );
}
