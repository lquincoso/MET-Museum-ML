import React, { useState, useContext } from "react";
import "../App.css";
import "./Sign-Up-Login.css";
// import axios from 'axios';
import { InputField } from "../components/InputField";
import { Button } from "../components/Button";
import AuthContext from "../context/AuthContext";

function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const { registerUser } = useContext(AuthContext);

  console.log(email);
  console.log(username);
  console.log(password);
  console.log(password2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    registerUser(email, username, password, password2);
  };

  return (
    <div className="main-container">
      <div className="form-container">
        <h1 className="title">Sign up</h1>
        <form className="login-signup-form" onSubmit={handleSubmit}>
          <InputField
            inputStyle="input--credentials"
            id="login-signup-form"
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            inputStyle="input--credentials"
            id="login-signup-form"
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            inputStyle="input--credentials"
            id="login-signup-form"
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            inputStyle="input--credentials"
            id="login-signup-form"
            type="password"
            placeholder="Confirm Password"
            name="password"
            onChange={(e) => setPassword2(e.target.value)}
          />
          <div className="btn-wrapper">
            <Button
              buttonStyle="btn--login-signup"
              type="submit"
              aria-label="sign up"
            >
              sign up
            </Button>
          </div>
          <a className="login-signup-link" href="/login">
            Already registered? Login
          </a>
        </form>
      </div>
    </div>
  );
}
export default SignUp;
