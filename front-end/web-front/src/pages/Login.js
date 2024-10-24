import React, { useState, useContext } from "react";
import "../App.css";
import "./Sign-Up-Login.css";
import AuthContext from "../context/AuthContext";
import { InputField } from "../components/InputField";
import { Button } from "../components/Button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.length > 0) {
      loginUser(email, password);
    }
    console.log("Email: ", email);
    console.log("Password: ", password);
  };

  return (
    <div className="main">
      <div className="form-container">
        <h1 className="title">Login</h1>
        <form className="login-signup-form" onSubmit={handleSubmit}>
          <InputField
            inputStyle="input--credentials"
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            inputStyle="input--credentials"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="btn-wrapper">
            <Button
              buttonStyle="btn--login-signup"
              type="submit"
              aria-label="login"
            >
              Login
            </Button>
          </div>
          <a className="login-signup-link" href="/sign-up">
            New User? Sign up
          </a>
        </form>
      </div>
    </div>
  );
}

export default Login;
