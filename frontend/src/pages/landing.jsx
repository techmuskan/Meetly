import React from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landingPageContainer">
      {/* Navbar */}
      <nav>
        <div className="navHeader">
          <h2>SyncView</h2>
        </div>

        <div className="navList">
          <p onClick={() => navigate("/dashboard")}>Join as Guest</p>

          <Link to="/auth?mode=signup">Register</Link>

          <Link to="/auth">Login</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="mainContent">
        {/* Left */}
        <div className="mainLeft">
          <h2>
            <span>Connect</span> with your
          </h2>
          <h2>Loved Ones</h2>

          <p>Cover distance with SyncView</p>

          <Link to="/auth" className="ctaButton">
            Get Started
          </Link>
        </div>

        {/* Right */}
        <div className="mainRight">
          <img src="/right.jpg" alt="video call illustration" />
        </div>
      </div>
    </div>
  );
};

export default Landing;