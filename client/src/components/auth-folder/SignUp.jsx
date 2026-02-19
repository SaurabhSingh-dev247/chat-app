import { useDispatch } from "react-redux";
import { useState } from "react";
import Input from "../../UI/Input";
import { openSignIn, openDashBoard, setUser } from "../../store/auth-slice";
import PhoneInput from "../../UI/PhoneInput";
import PasswordInput from "../../UI/PasswordInput/PasswordInput.jsx";
import FileInput from "../../UI/FileInput/FileInput.jsx";
import Error from "../../UI/Error/Error.jsx";
import validator from "validator";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(undefined);
  const [error, setError] = useState("");

  const buttonClass = `btn btn-signin${isLoading ? " loading" : ""}`;

  function handleSubmit(e) {
    e.preventDefault();
  }

  async function handleSignUp(e) {
    e.preventDefault();

    const validEmail = validator.isEmail(email);

    if (
      validEmail &&
      password.trim() !== "" &&
      userName.trim() !== "" &&
      file
    ) {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "http://localhost:5193/api/auth/signup",
          {
            email,
            name: userName,
            password,
            avatar: file,
          },
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          },
        );
        setEmail("");
        setPassword("");
        setUserName("");
        dispatch(setUser(response.data));
        dispatch(openDashBoard());
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    } else if (!file && !validEmail && !password.trim() && !userName.trim()) {
      setError("Fill up all the fields.");
      return;
    } else if (!validEmail && file && password.trim() && userName.trim()) {
      setError("Enter you email.");
      return;
    } else if (!password.trim() && userName.trim() && validEmail && file) {
      setError("Enter you password.");
      return;
    } else if (!userName.trim() && validEmail && file && password.trim()) {
      setError("Enter your user name.");
    } else if (!file && password.trim() && userName.trim() && validEmail) {
      setError("Upload your avatar.");
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
            id="email"
            label="Email:"
            name="email"
            placeholder="test@test.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />
          <Input
            id="user-name"
            label="FullName:"
            placeholder="john doe"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
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
          <FileInput onFileChange={setFile} />
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
