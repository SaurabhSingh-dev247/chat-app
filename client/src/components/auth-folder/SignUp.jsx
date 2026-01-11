import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Input from "../../UI/Input";
import { openSignIn, openDashBoard, setUser } from "../../store/auth-slice";
import PhoneInput from "../../UI/PhoneInput";
import PasswordInput from "../../UI/PasswordInput/PasswordInput.jsx";
import Error from "../../UI/Error/Error.jsx";
import validator from "validator";
import axios from "axios";

export default function SignUp() {
  const dispatch = useDispatch();
  const dialCode = useSelector((state) => state.auth.dialCode);
  const phoneNumber = useSelector((state) => state.auth.phoneNumber);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const buttonClass = `btn btn-signin${isLoading ? " loading" : ""}`;

  function handleSubmit(e) {
    e.preventDefault();
  }

  async function handleSignUp(e) {
    e.preventDefault();

    const validEmail = validator.isEmail(email);

    if (validEmail && password.trim() !== "" && userName.trim() !== "") {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "http://localhost:5193/api/auth/signup",
          {
            email,
            name: userName,
            password,
          },
          { withCredentials: true }
        );
        console.log(response);
        setEmail("");
        setPassword("");
        setUserName("");
        dispatch(setUser(response.data));
        dispatch(openDashBoard());
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Enter valid credentials.");
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit} className="page-container">
      <div className="signup-card">
        <div className="signup-text-controller">
          <h2 className="signup-title">Sign Up</h2>
        </div>
        {error && <Error error={error} onClose={() => setError("")} />}
        <div className="input-container">
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

          <PasswordInput
            id="password"
            name="password"
            label="Password:"
            placeholder="●●●●●●●●"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
          />
        </div>
        <div className="btn-controller">
          <button
            className={buttonClass}
            disabled={isLoading}
            onClick={handleSignUp}
          >
            {isLoading ? "SigningUp..." : "SignUp"}
          </button>
        </div>
        <div className="auth-nav-controller">
          <p className="auth-nav-text">Already an user?</p>
          <button
            onClick={() => dispatch(openSignIn())}
            className="auth-nav-btn"
          >
            SignIn
          </button>
        </div>
      </div>
    </form>
  );
}

// <PhoneInput errCallback={setError} />
