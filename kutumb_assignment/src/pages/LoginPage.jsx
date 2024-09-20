import React, { useState } from "react";
import "./styles.css";
import OTPInput from "../components/OtpComponent"; 

const LoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://assignment.stage.crafto.app/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, otp }), 
        }
      );

      const data = await response.json();

      if (response.ok) {
        onLoginSuccess(data.token); 
      } else {
        alert("Login failed. Please check your credentials.");
        throw new Error(response);
      }
    } catch (error) {
      alert("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="login-input"
            placeholder="Enter username (Ex: sandy)"
          />

          <label>OTP </label>
          <div style={{ fontSize: "10px" }}>
            (As of now we have to use 1234 bcoz api is throwing error if we are
            using something else but component is handling copy paste)
          </div>
          <OTPInput length={4} value={otp} onChangeOtp={setOtp} />

          <button type="submit" className="login-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
