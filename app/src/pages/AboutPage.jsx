import React from "react";
import "./AboutPage.css";

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <div className="about-us-container">
        <div className="hero-section">
          <h1>About Us</h1>
          <div className="section">
            <h2>Introduction</h2>
            <p>
              Welcome to Flixxit, your ultimate destination for streaming
              movies.
            </p>
          </div>
        </div>
        <div className="section">
          <h2>Unlimited Entertainment</h2>
          <p>
            Explore a vast library of movies and series across various
            genres, available at your fingertips.
          </p>
        </div>
        <div className="section">
          <h2>Original Content</h2>
          <p>
            Experience exclusive original content that you won't find anywhere
            else.
          </p>
        </div>
        <div className="section">
          <h2>Seamless Streaming</h2>
          <p>Enjoy high-quality streaming on any device, anywhere, anytime.</p>
        </div>
        <div className="section">
          <h2>Personalized Recommendations</h2>
          <p>
            Discover new favorites with personalized recommendations based on
            your viewing history.
          </p>
        </div>

        <div className="section">
          <h2>Copyrights, Terms, and Conditions</h2>
          <p>
            All content on Flixxit is protected by copyright and may not be used
            without permission. By using our service, you agree to adhere to our
            terms and conditions.
          </p>
        </div>
        <div className="section">
          <h2>Help Desk</h2>
          <p>
            For any further assistance or inquiries, please reach out to our
            Help Desk:
          </p>
          <p>
            {" "}
            Email: help@flixxit.com | Phone: 1234567890
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
