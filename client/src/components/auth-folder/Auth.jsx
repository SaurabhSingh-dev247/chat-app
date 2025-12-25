import { useDispatch, useSelector } from "react-redux";
import { openSignUp } from "../../store/auth-slice.js";
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";

export default function Auth() {
  const signInOpen = useSelector((state) => state.auth.isSignInOpen);
  const sigUpOpen = useSelector((state) => state.auth.isSignUpOpen);

  return (
    <>
      {signInOpen && <SignIn />}
      {sigUpOpen && <SignUp />}
    </>
  );
}

//  <div className="form-container">
//           <input
//             type="email"
//             placeholder="Email address"
//             className="form-input"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="form-input"
//           />
//           <button
//             className="btn btn-signin"
//           >
//             Sign In
//           </button>
//         </div>
