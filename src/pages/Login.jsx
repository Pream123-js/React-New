import "./Login.css";

import { Link, useNavigate } from "react-router-dom";

import loginImage from "../assets/studentportal.jpg";
import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy login (temporary)
    if (username === "hod" && password === "admin1234") {
      navigate("/dashboard");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login-wrapper">
      {/* LEFT SIDE - LOGIN */}
      <div className="login-left">
        <form className="login-card" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <p className="sub-text">Enter your account details</p>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="forgot">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit">Login</button>
        </form>
      </div>

      {/* RIGHT SIDE - IMAGE */}
      <div className="login-right">
        <h1>
          Welcome to <br />
          <span>student Management portal</span>
        </h1>
        <p>Login to access your account</p>

        <img src={loginImage} alt="Student Portal" />
      </div>
    </div>
  );
}

export default Login;
