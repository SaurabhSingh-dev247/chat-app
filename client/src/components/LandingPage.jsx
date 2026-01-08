import Header from "./Header";
import Home from "./Home";
import Auth from "./auth-folder/Auth";
import About from "./About";
import { Routes, Route } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}
