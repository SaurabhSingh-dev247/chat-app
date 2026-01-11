import { useDispatch, useSelector } from "react-redux";
import { openSignUp } from "../../store/auth-slice.js";
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";


export default function Auth() {
  const signInOpen = useSelector((state) => state.auth.isSignInOpen);
  const signUpOpen = useSelector((state) => state.auth.isSignUpOpen);


  return (
    <>
      {signInOpen && <SignIn />}
      {signUpOpen && <SignUp />}
    </>
  );
}
// {verificationOpen && <Verification />}
