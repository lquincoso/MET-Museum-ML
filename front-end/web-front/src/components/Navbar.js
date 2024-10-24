import React, { useState, useEffect, useContext } from "react";
import jwtDecode from "jwt-decode";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { ReactComponent as Logo } from "../assets/theMet.svg";
import { ReactComponent as Close } from "../assets/close.svg";
import { ReactComponent as Menu } from "../assets/menu.svg";
import "./Navbar.css";

const NAV_ITEMS = [
  { to: "/tour", label: "Tour" },
  { to: "/art-collection", label: "Art Collection" },
  { to: "/education", label: "Education" },
];

function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const token = localStorage.getItem("authTokens");
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  if (token) {
    const decoded = jwt_decode(token);
    var user_id = decoded.user_id;
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 960) {
        setIsBurgerMenuOpen(false); // Reset burger menu when switching to desktop
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeBurgerMenu = () => setIsBurgerMenuOpen(false);

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeBurgerMenu}>
          <Logo className="logo" aria-label="The Metropolitan Museum of Art" />
        </Link>

        <ul className={`nav-menu ${isBurgerMenuOpen ? "active" : ""}`}>
          {NAV_ITEMS.map(({ to, label }) => (
            <li key={to} className="nav-item">
              <Link to={to} className="nav-links" onClick={closeBurgerMenu}>
                {label}
              </Link>
            </li>
          ))}

          <li className="nav-item mobile-only">
            <Link
              to="/sign-up"
              className="nav-links-mobile"
              onClick={closeBurgerMenu}
            >
              Sign Up
            </Link>
          </li>
          <li className="nav-item mobile-only">
            <Link
              to="/login"
              className="nav-links-mobile"
              onClick={closeBurgerMenu}
            >
              Login
            </Link>
          </li>
        </ul>
        <div className="nav-menu-tablet">
          <div className="button-group">
            <Button buttonStyle="btn--nav" to="/sign-up" aria-label="Sign Up">
              Sign Up
            </Button>
            <Button
              buttonStyle="btn--nav-outline"
              to="/login"
              aria-label="Login"
            >
              Login
            </Button>
          </div>

          <button
            className="menu-icon"
            onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
            aria-expanded={isBurgerMenuOpen}
            aria-label={isBurgerMenuOpen ? "Close menu" : "Open menu"}
          >
            {isBurgerMenuOpen ? (
              <Close aria-hidden="true" />
            ) : (
              <Menu aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
