import LandingPageImage from "../UI/LandingPageImage";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <section className="landing-page">
      <div className="text-content">
        <h2 className="landing-title">Built to connect the world.</h2>
        <p className="landing-description">
          Connect with your family, friends, and loved ones using
          <br />
          react chat.
        </p>
        <div className="button-group">
          <button onClick={() => navigate("/auth")} className="btn btn-primary">
            Get Started
          </button>{" "}
          <button
            onClick={() => navigate("/about")}
            className="btn btn-secondary"
          >
            Learn More
          </button>
        </div>
      </div>

      <div className="image-container">
        <LandingPageImage />
      </div>
    </section>
  );
}
