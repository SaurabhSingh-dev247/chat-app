import { useDispatch } from "react-redux";
import { useState } from "react";
import { openSignUp, openDashBoard, setUser } from "../../store/auth-slice.js";
import PasswordInput from "../../UI/PasswordInput/PasswordInput.jsx";
import Input from "../../UI/Input.jsx";
import Error from "../../UI/Error/Error.jsx";
import axiosInstance from "../../api/axios";
import validator from "validator";

export default function SignIn() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const buttonClass = `btn btn-signin${isLoading ? " loading" : ""}`;

  // Form validation state
  const isFormValid = validator.isEmail(email) && password.trim() !== "";

  function handleSubmit(e){
    e.preventDefault();
  }

  async function handleSignIn(e) {
    e.preventDefault();

    // Better validation with specific error messages
    if (!validator.isEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const response = await axiosInstance.post("/auth/signin", {
        email,
        password,
      });

      // Clear form on success
      setEmail("");
      setPassword("");

      dispatch(setUser(response.data));
      dispatch(openDashBoard());
    } catch (error) {
      // Better error handling
      const errorMessage =
        error.response?.data?.msg ||
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="page-container">
      <div className="signin-card">
        <div className="signin-text-controller">
          <h2 className="signin-title">Sign In</h2>
        </div>

        {error && <Error error={error} onClose={() => setError("")} />}

        <div className="input-container">
          <Input
            id="email"
            name="email"
            type="email"
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
            type="submit"
            className={buttonClass}
            disabled={isLoading || !isFormValid}
            onClick={handleSignIn}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </div>

        <div className="auth-nav-controller">
          <p className="auth-nav-text">New user?</p>
          <button
            type="button"
            onClick={() => dispatch(openSignUp())}
            className="auth-nav-btn"
          >
            SignUp
          </button>
        </div>
      </div>
    </form>
  );
}
