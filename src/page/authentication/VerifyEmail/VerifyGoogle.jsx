import React, { useState } from "react";
import { sendOtp, verifyOtp } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import "../auth-common.css";

const EmailVerification = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email) {
      setMessage("Email is required.");
      return;
    }

    try {
      const response = await sendOtp(email);

      if (response.success) {
        setIsOtpSent(true);
        setMessage(response.message);
      } else {
        setMessage(response.message);
        navigate("/signup");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setMessage("OTP is required.");
      return;
    }

    try {
      const response = await verifyOtp(email, otp);

      if (response.success) {
        setMessage(response.message);
        navigate("/");
      } else {
        setMessage(response.message);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-background-content">
          <h1>Email Verification</h1>
          <p>
            Please verify your email address to complete your account setup and
            access all features.
          </p>
        </div>
      </div>

      <div className="auth-content">
        <div className="auth-form-container">
          <div className="auth-header">
            <h2>
              {isOtpSent ? "Enter Verification Code" : "Verify Your Email"}
            </h2>
            <p>
              {isOtpSent
                ? "Enter the code we sent to your email"
                : "Enter your email address to receive a verification code"}
            </p>
          </div>

          <form className="auth-form">
            {!isOtpSent ? (
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="form-control"
                />
                <button
                  type="button"
                  className="auth-button"
                  onClick={handleSendOtp}
                >
                  Send Verification Code
                </button>
              </div>
            ) : (
              <div className="form-group">
                <label>Verification Code</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter verification code"
                  className="form-control"
                  maxLength="6"
                />
                <button
                  type="button"
                  className="auth-button"
                  onClick={handleVerifyOtp}
                >
                  Verify Code
                </button>
              </div>
            )}

            {message && (
              <div
                className={`message ${
                  message.includes("success") ? "success" : "error"
                }`}
              >
                {message}
              </div>
            )}

            <div
              className="auth-links"
              style={{ marginTop: "2rem", textAlign: "center" }}
            >
              <a href="/login">Back to Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
