import React, { useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { ReactComponent as Logo } from "../assets/theMet.svg";
import { ReactComponent as Close } from "../assets/close.svg";
import { ReactComponent as Menu } from "../assets/menu.svg";
import { ReactComponent as Favorite } from "../assets/favorite.svg";
import { ReactComponent as User } from "../assets/user.svg";
import AuthContext from "../context/AuthContext";
import "./Navbar.css";

const NAV_ITEMS = [
  { to: "/tour", label: "Tour" },
  { to: "/art-collection", label: "Art Collection" },
];

function Navbar() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { logoutUser } = useContext(AuthContext);
  const token = localStorage.getItem("authTokens");

  if (token) {
    const decoded = jwtDecode(token);
    var user_id = decoded.user_id;
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 960) {
        setIsBurgerMenuOpen(false);
      }
      if (window.innerWidth > 768) {
        setIsUserMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeBurgerMenu = () => setIsBurgerMenuOpen(false);
  const closeUserMenu = () => setIsUserMenuOpen(false);

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-container">
        <Link
          to="/"
          className="navbar-logo"
          onClick={() => {
            closeUserMenu();
            closeBurgerMenu();
          }}
        >
          <Logo className="logo" aria-label="The Metropolitan Museum of Art" />
        </Link>

        <ul className={`nav-menu ${isBurgerMenuOpen ? "active" : ""}`}>
          {NAV_ITEMS.map(({ to, label }) => (
            <li key={to} className="nav-item">
              <Link
                to={to}
                className="nav-links"
                onClick={() => {
                  closeUserMenu();
                  closeBurgerMenu();
                }}
              >
                {label}
              </Link>
            </li>
          ))}
          {token === null && (
            <>
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
            </>
          )}
          {token !== null && (
            <>
              <li className="nav-item mobile-only">
                <Link
                  to="/my-gallery"
                  className="nav-links-mobile"
                  onClick={() => {
                    closeUserMenu();
                    closeBurgerMenu();
                  }}
                >
                  Favorites
                </Link>
              </li>
              <li className="nav-item mobile-only">
                <Link
                  to="/"
                  className="nav-links-mobile"
                  onClick={() => {
                    logoutUser();
                    closeUserMenu();
                    closeBurgerMenu();
                  }}
                >
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className="nav-menu-tablet">
          <div className="button-group">
            {token === null && (
              <>
                <Button
                  buttonStyle="btn--nav"
                  to="/sign-up"
                  aria-label="Sign Up"
                >
                  Sign Up
                </Button>
                <Button
                  buttonStyle="btn--nav-outline"
                  to="/login"
                  aria-label="Login"
                >
                  Login
                </Button>
              </>
            )}
            {token !== null && (
              <>
                <Link
                  className="favorite-icon"
                  to='/my-gallery'
                  onClick={() => {
                    closeUserMenu();
                    closeBurgerMenu();
                  }}
                  aria-label="Favorites"
                >
                  <Favorite />
                </Link>
                <button
                  className="user-icon"
                  onClick={() => {
                    setIsUserMenuOpen(!isUserMenuOpen);
                    closeBurgerMenu();
                  }}
                  aria-expanded={isUserMenuOpen}
                  aria-label={
                    isUserMenuOpen ? "Close user menu" : "Open user menu"
                  }
                >
                  <User />
                </button>
              </>
            )}
          </div>
          <ul className={`user-menu ${isUserMenuOpen ? "active" : ""}`}>
            <li className="user-menu-item">
              <Link
                to={`/user/${user_id}`}
                className="user-menu-links"
                onClick={closeUserMenu}
              >
                Profile
              </Link>
            </li>
            <li className="user-menu-item">
              <Link
                to="/"
                className="user-menu-links"
                onClick={() => {
                  logoutUser();
                  closeUserMenu();
                }}
              >
                Logout
              </Link>
            </li>
          </ul>
          <button
            className="menu-icon"
            onClick={() => {
              setIsBurgerMenuOpen(!isBurgerMenuOpen);
              closeUserMenu();
            }}
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
