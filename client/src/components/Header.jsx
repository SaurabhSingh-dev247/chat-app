import ReactLogo from "../UI/ReactLogo";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <ReactLogo />
        <h1 className="logo-text">React Chat</h1>
      </div>

      <nav className="nav">
        <NavLink
          to="/"
          className={`nav-link  ${({ isActive }) =>
            isActive ? "active" : ""}`}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={`nav-link  ${({ isActive }) =>
            isActive ? "active" : ""}`}
        >
          About
        </NavLink>
        <NavLink
          to="/auth"
          className={`nav-link  ${({ isActive }) =>
            isActive ? "active" : ""}`}
        >
          Sign In
        </NavLink>
      </nav>
    </header>
  );
}

//  <header className="header">
//         <div className="logo-container">
//           {/* React Logo */}
//
//           <h1 className="logo-text">React Chat</h1>
//         </div>

//         <nav className="nav">
//           <button
//             onClick={() => setCurrentPage("home")}
//             className={`nav-link ${currentPage === "home" ? "active" : ""}`}
//           >
//             Home
//           </button>
//           <button
//             onClick={() => setCurrentPage("about")}
//             className={`nav-link ${currentPage === "about" ? "active" : ""}`}
//           >
//             About
//           </button>
//           <button
//             onClick={() => setCurrentPage("signin")}
//             className={`nav-link ${currentPage === "signin" ? "active" : ""}`}
//           >
//             Sign In
//           </button>
//         </nav>
//       </header>
