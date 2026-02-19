import Header from "./Header.jsx";
import Home from "./Home.jsx";
import Auth from "./auth-folder/Auth.jsx";
import About from "./About.jsx";
import DashBoard from "../components/dashboard/DashBoard.jsx";
import { Routes, Route } from "react-router-dom";

export default function LandingPage() {
  return (
    <main className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </main>
  );
}

/* {!isPageLoading && isDashboardOpen && Object.keys(user).length > 0 && (
          <Route path="/dashboard" element={<DashBoard />} />
        )} */
