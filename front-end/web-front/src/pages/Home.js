import React from "react";
import "../App.css";
import "./Home.css";
import { Button } from "../components/Button";
import { ReactComponent as Logo } from "../assets/theMet.svg";

function Home() {
  return (
    <>
      <main className="hero-container">
        <div className="headings">
          <Logo className="main-logo"></Logo>
          <h1>Discover Art Like Never Before</h1>
          <div className="cta-buttons">
            <Button
              buttonStyle="btn--landing"
              to="/tour"
              aria-label="Take a virtual tour"
            >
              Take a Virtual Tour
            </Button>
            <Button
              buttonStyle="btn--landing"
              to="/education"
              aria-label="Learn about the art"
            >
              Learn About the Art
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
