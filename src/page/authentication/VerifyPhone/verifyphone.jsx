import React, { useState, useEffect } from "react";
import { firebase } from "../../../config/FirebaseConfig";
import "../auth-common.css";

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        defaultCountry: "VN",
        callback: (response) => {
          console.log("reCAPTCHA solved:", response);
        },
      }
    );
  }, []);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (value) => {
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
    }
  };

  const handleSendOtp = async () => {
    if (!phoneNumber) {
      alert("Vui lòng nhập số điện thoại");
      return;
    }
    try {
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier);
      window.confirmationResult = confirmationResult;
      alert("Đã gửi OTP thành công");
      setIsOtpSent(true);
      setTimer(60);
      setMessage("");
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage("Gửi OTP thất bại. Vui lòng thử lại sau.");
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      alert("Vui lòng nhập đủ 6 chữ số OTP");
      return;
    }
    try {
      await window.confirmationResult.confirm(otp);
      alert("Xác thực thành công!");
      setMessage("Xác thực thành công!");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage("OTP không đúng hoặc đã hết hạn.");
    }
  };

  return (
    <div className="authen-container">
      <div className="authen-background">
      </div>

      <div className="authen-content">
        <div className="authen-form-container">
          <div className="authen-header">
            <h2>Phone Verification</h2>
            <p>
              {isOtpSent
                ? "Enter the code we sent you"
                : "Enter your phone number to get started"}
            </p>
          </div>

          <div id="sign-in-button" style={{ display: "none" }}></div>

          <div className="authen-form">
            {!isOtpSent ? (
              <div className="authen-form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter phone number (e.g., +84912345678)"
                  className="authen-form-control"
                />
                <button
                  className="authen-button"
                  onClick={handleSendOtp}
                  disabled={!phoneNumber || timer > 0}
                >
                  {timer > 0 ? `Send Again in ${timer}s` : "Send Verification Code"}
                </button>
              </div>
            ) : (
              <>
                <div className="authen-form-group">
                  <label>Enter OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => handleOtpChange(e.target.value)}
                    maxLength={6}
                    className="authen-form-control"
                    placeholder="Enter 6-digit code"
                  />
                </div>

                <button
                  className="authen-button"
                  onClick={handleVerifyOtp}
                  disabled={otp.length !== 6}
                >
                  Verify Code
                </button>

                <div className="authen-resend-code" style={{ marginTop: 10 }}>
                  {timer > 0 ? (
                    <div className="authen-timer">Resend code in {timer}s</div>
                  ) : (
                    <button
                      className="authen-button"
                      onClick={handleSendOtp}
                      style={{ backgroundColor: "transparent", color: "#4a90e2" }}
                    >
                      Resend Code
                    </button>
                  )}
                </div>
              </>
            )}

            {message && (
              <div
                className={`authen-message ${
                  message.includes("failed") || message.includes("not")
                    ? "authen-error"
                    : "authen-success"
                }`}
                style={{ marginTop: "10px" }}
              >
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneAuth;
