import React, { useState, useEffect } from "react";
import { firebase } from "../../../config/FirebaseConfig";
import "../auth-common.css";

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);

  // Khởi tạo reCAPTCHA khi component mount
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

  // Timer đếm ngược cho nút gửi lại OTP
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Hàm xử lý nhập OTP, giới hạn 6 số
  const handleOtpChange = (value) => {
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
    }
  };

  // Gửi OTP
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
      setTimer(60); // Bắt đầu đếm ngược 60 giây
      setMessage("");
    } catch (error) {
      console.error("Error sending OTP:", error);
      setMessage("Gửi OTP thất bại. Vui lòng thử lại sau.");
    }
  };

  // Xác thực OTP
  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      alert("Vui lòng nhập đủ 6 chữ số OTP");
      return;
    }
    try {
      await window.confirmationResult.confirm(otp);
      alert("Xác thực thành công!");
      setMessage("Xác thực thành công!");
      // Có thể reset form hoặc chuyển trang ở đây
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage("OTP không đúng hoặc đã hết hạn.");
    }
  };

  return (
      <div className="auth-container">
        <div className="auth-background">
          <div className="auth-background-content">
            <h1>Verify Your Phone</h1>
            <p>
              We want to make sure it's really you. Please enter the verification
              code we sent to your phone.
            </p>
          </div>
        </div>

        <div className="auth-content">
          <div className="auth-form-container">
            <div className="auth-header">
              <h2>Phone Verification</h2>
              <p>
                {isOtpSent
                    ? "Enter the code we sent you"
                    : "Enter your phone number to get started"}
              </p>
            </div>

            {/* reCAPTCHA mount point */}
            <div id="sign-in-button" style={{ display: "none" }}></div>

            <div className="auth-form">
              {!isOtpSent ? (
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter phone number (e.g., +84912345678)"
                        className="form-control"
                    />
                    <button
                        className="auth-button"
                        onClick={handleSendOtp}
                        disabled={!phoneNumber || timer > 0}
                    >
                      {timer > 0 ? `Send Again in ${timer}s` : "Send Verification Code"}
                    </button>
                  </div>
              ) : (
                  <>
                    <div className="form-group">
                      <label>Enter OTP</label>
                      <input
                          type="text"
                          value={otp}
                          onChange={(e) => handleOtpChange(e.target.value)}
                          maxLength={6}
                          className="form-control"
                          placeholder="Enter 6-digit code"
                      />
                    </div>

                    <button
                        className="auth-button"
                        onClick={handleVerifyOtp}
                        disabled={otp.length !== 6}
                    >
                      Verify Code
                    </button>

                    <div className="resend-code" style={{ marginTop: 10 }}>
                      {timer > 0 ? (
                          <div className="timer">Resend code in {timer}s</div>
                      ) : (
                          <button
                              className="auth-button"
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
                      className={`message ${
                          message.includes("failed") || message.includes("not")
                              ? "error"
                              : "success"
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
