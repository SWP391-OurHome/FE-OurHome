import React, { useState, useEffect, useRef } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../../config/FirebaseConfig";
import "../auth-common.css";

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaInitialized, setRecaptchaInitialized] = useState(false);
  const recaptchaId = useRef(
    `recaptcha-${Math.random().toString(36).substr(2, 9)}`
  );

  // Khởi tạo reCAPTCHA khi cần thiết
  const initializeRecaptcha = async () => {
    // Kiểm tra xem reCAPTCHA đã được khởi tạo chưa
    if (recaptchaInitialized || window.recaptchaVerifier) {
      return true;
    }

    // Đợi một chút để đảm bảo DOM đã sẵn sàng
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Kiểm tra xem phần tử có tồn tại không
    const recaptchaContainer = document.getElementById(recaptchaId.current);
    if (!recaptchaContainer) {
      console.error(`reCAPTCHA container ${recaptchaId.current} not found`);
      setMessage("Lỗi: Không tìm thấy container reCAPTCHA.");
      return false;
    }

    // Kiểm tra xem element đã có reCAPTCHA chưa
    if (
      recaptchaContainer.querySelector(".grecaptcha-badge") ||
      recaptchaContainer.children.length > 0
    ) {
      console.log("reCAPTCHA already exists, clearing container...");
      recaptchaContainer.innerHTML = "";
      // Đợi thêm một chút để đảm bảo DOM đã được cập nhật
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        recaptchaId.current,
        {
          size: "invisible",
          callback: (response) => {
            console.log("reCAPTCHA solved:", response);
          },
          "expired-callback": () => {
            console.log("reCAPTCHA expired");
            setMessage("reCAPTCHA đã hết hạn. Vui lòng thử lại.");
            // Reset reCAPTCHA khi hết hạn
            setRecaptchaInitialized(false);
            if (window.recaptchaVerifier) {
              try {
                window.recaptchaVerifier.clear();
              } catch (e) {
                console.log("Error clearing expired reCAPTCHA:", e);
              }
              window.recaptchaVerifier = null;
            }
          },
        }
      );

      // Render reCAPTCHA
      await window.recaptchaVerifier.render();
      setRecaptchaInitialized(true);
      console.log("reCAPTCHA initialized successfully");
      return true;
    } catch (error) {
      console.error("Error initializing reCAPTCHA:", error);
      if (error.message.includes("reCAPTCHA has already been rendered")) {
        console.log("reCAPTCHA already rendered, clearing and retrying...");
        // Xóa container và thử lại
        recaptchaContainer.innerHTML = "";
        window.recaptchaVerifier = null;
        setRecaptchaInitialized(false);
        // Thử khởi tạo lại sau 1 giây
        setTimeout(async () => {
          await initializeRecaptcha();
        }, 1000);
        return false;
      } else {
        setMessage("Lỗi khởi tạo reCAPTCHA. Vui lòng thử lại.");
        setRecaptchaInitialized(false);
        return false;
      }
    }
  };

  // Cleanup khi component unmount
  useEffect(() => {
    return () => {
      // Dọn dẹp reCAPTCHA khi component unmount
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (error) {
          console.log("Error clearing reCAPTCHA:", error);
        }
        window.recaptchaVerifier = null;
      }
      setRecaptchaInitialized(false);
    };
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

  // Validate số điện thoại
  const validatePhoneNumber = (phone) => {
    // Đảm bảo số điện thoại có định dạng quốc tế
    if (!phone.startsWith("+")) {
      return false;
    }
    // Loại bỏ ký tự không phải số và +
    const cleanPhone = phone.replace(/[^\d+]/g, "");
    // Kiểm tra độ dài (ít nhất 10 số, tối đa 15 số)
    return cleanPhone.length >= 10 && cleanPhone.length <= 15;
  };

  // Reset reCAPTCHA
  const resetRecaptcha = () => {
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (e) {
        console.log("Error clearing reCAPTCHA:", e);
      }
      window.recaptchaVerifier = null;
    }
    setRecaptchaInitialized(false);

    // Xóa nội dung trong container
    const recaptchaContainer = document.getElementById(recaptchaId.current);
    if (recaptchaContainer) {
      recaptchaContainer.innerHTML = "";
    }
  };

  // Gửi OTP
  const handleSendOtp = async () => {
    if (!phoneNumber) {
      setMessage("Vui lòng nhập số điện thoại");
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setMessage("Vui lòng nhập số điện thoại hợp lệ (ví dụ: +84912345678)");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // Khởi tạo reCAPTCHA nếu chưa có
      const recaptchaReady = await initializeRecaptcha();
      if (!recaptchaReady) {
        setMessage("Không thể khởi tạo reCAPTCHA. Vui lòng thử lại.");
        return;
      }

      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) {
        setMessage("reCAPTCHA chưa được khởi tạo. Vui lòng thử lại.");
        return;
      }

      // Đảm bảo reCAPTCHA đã sẵn sàng
      await appVerifier.verify();

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      window.confirmationResult = confirmationResult;
      setMessage("Đã gửi OTP thành công");
      setIsOtpSent(true);
      setTimer(60);
    } catch (error) {
      console.error("Error sending OTP:", error);
      if (error.code === "auth/invalid-phone-number") {
        setMessage("Số điện thoại không hợp lệ. Vui lòng kiểm tra lại.");
      } else if (error.code === "auth/too-many-requests") {
        setMessage("Quá nhiều yêu cầu. Vui lòng thử lại sau.");
      } else if (
        error.message.includes("reCAPTCHA has already been rendered")
      ) {
        setMessage("Lỗi reCAPTCHA. Đang reset...");
        resetRecaptcha();
        // Thử khởi tạo lại sau 2 giây
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setMessage("Gửi OTP thất bại. Vui lòng thử lại sau.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Xác thực OTP
  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setMessage("Vui lòng nhập đủ 6 chữ số OTP");
      return;
    }
    try {
      await window.confirmationResult.confirm(otp);
      setMessage("Xác thực thành công!");
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
          <div id={recaptchaId.current} style={{ display: "none" }}></div>

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
                  disabled={!phoneNumber || timer > 0 || isLoading}
                >
                  {isLoading
                    ? "Đang gửi..."
                    : timer > 0
                    ? `Send Again in ${timer}s`
                    : "Send Verification Code"}
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
                      style={{
                        backgroundColor: "transparent",
                        color: "#4a90e2",
                      }}
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
                  message.includes("thất bại") ||
                  message.includes("hết hạn") ||
                  message.includes("khởi tạo")
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
