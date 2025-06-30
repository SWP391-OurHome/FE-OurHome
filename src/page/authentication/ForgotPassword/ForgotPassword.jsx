import React, { useState } from "react";
import "./ForgotPassword.css";


const ForgotPassword = () => {
 const [email, setEmail] = useState("");


 // Validation cho mật khẩu
 const validatePassword = (password) => {
   const hasUpperCase = /[A-Z]/.test(password);
   const hasNumber = /\d/.test(password);
   const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
   const hasMinLength = password.length >= 8;


   return {
     isValid: hasUpperCase && hasNumber && hasSpecialChar && hasMinLength,
     hasUpperCase,
     hasNumber,
     hasSpecialChar,
     hasMinLength,
   };
 };


 const handleSendOtp = async (e) => {
   e.preventDefault();
   setLoading(true);
   setError("");
   setMessage("");


   try {
     const result = await sendOtp(email);
     if (result.success) {
       setMessage(result.message);
       setStep(2);
     } else {
       setError(result.message);
     }
   } catch (err) {
     setError("Có lỗi xảy ra khi gửi OTP");
   } finally {
     setLoading(false);
   }
 };


 const handleVerifyOtp = async (e) => {
   e.preventDefault();
   setLoading(true);
   setError("");
   setMessage("");


   try {
     const result = await verifyOtp(email, otp);
     if (result.success) {
       setMessage(result.message);
       setStep(3);
     } else {
       setError(result.message);
     }
   } catch (err) {
     setError("Có lỗi xảy ra khi xác thực OTP");
   } finally {
     setLoading(false);
   }
 };


 const handleResetPassword = async (e) => {
   e.preventDefault();
   setError("");
   setMessage("");


   const passwordValidation = validatePassword(password);
   if (!passwordValidation.isValid) {
     setError("Mật khẩu không đáp ứng yêu cầu bảo mật");
     return;
   }


   if (password !== confirmPassword) {
     setError("Mật khẩu xác nhận không khớp");
     return;
   }


   setLoading(true);
   try {
     const result = await resetPassword(email, password);
     if (result.success) {
       setMessage("Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại.");
       // Redirect to login sau 2 giây
       setTimeout(() => {
         window.location.href = "/login";
       }, 2000);
     } else {
       setError(result.message);
     }
   } catch (err) {
     setError("Có lỗi xảy ra khi đặt lại mật khẩu");
   } finally {
     setLoading(false);
   }
 };


 const passwordValidation = validatePassword(password);


 return (
   <div className="fp-container">
     {/* Phần background (7/10) */}
     <div className="fp-background"></div>


     {/* Phần nội dung (3/10) */}
     <div className="fp-content">
       <div className="fp-form">
         {/* Bước 1: Nhập email */}
         {step === 1 && (
           <div className="fp-step">
             <h2>Quên mật khẩu</h2>
             <p>Nhập email của bạn để nhận mã OTP</p>


             <form onSubmit={handleSendOtp}>
               <input
                 type="email"
                 className="fp-input"
                 placeholder="Nhập email của bạn"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 required
               />


               <div className="fp-button-group">
                 <button
                   type="submit"
                   className="fp-btn fp-btn-primary"
                   disabled={loading}
                 >
                   {loading ? "Đang gửi..." : "Gửi OTP"}
                 </button>
               </div>
             </form>


             <p className="fp-link">
               Nhớ mật khẩu? <a href="/login">Đăng nhập</a>
             </p>
           </div>
         )}


         {/* Bước 2: Nhập OTP */}
         {step === 2 && (
           <div className="fp-step">
             <h2>Xác thực OTP</h2>
             <p>Nhập mã OTP đã được gửi đến {email}</p>


             <form onSubmit={handleVerifyOtp}>
               <input
                 type="text"
                 className="fp-input"
                 placeholder="Nhập mã OTP"
                 value={otp}
                 onChange={(e) => setOtp(e.target.value)}
                 required
                 maxLength={6}
               />


               <div className="fp-button-group">
                 <button
                   type="submit"
                   className="fp-btn fp-btn-primary"
                   disabled={loading}
                 >
                   {loading ? "Đang xác thực..." : "Xác thực OTP"}
                 </button>
                 <button
                   type="button"
                   className="fp-btn"
                   onClick={() => setStep(1)}
                 >
                   Quay lại
                 </button>
               </div>
             </form>
           </div>
         )}


         {/* Bước 3: Nhập mật khẩu mới */}
         {step === 3 && (
           <div className="fp-step">
             <h2>Đặt lại mật khẩu</h2>
             <p>Tạo mật khẩu mới cho tài khoản của bạn</p>


             <form onSubmit={handleResetPassword}>
               <input
                 type="password"
                 className="fp-input"
                 placeholder="Mật khẩu mới"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required
               />


               <input
                 type="password"
                 className="fp-input"
                 placeholder="Xác nhận mật khẩu"
                 value={confirmPassword}
                 onChange={(e) => setConfirmPassword(e.target.value)}
                 required
               />


               {/* Hiển thị yêu cầu mật khẩu */}
               <div className="fp-input-hint">
                 <p>Mật khẩu phải có:</p>
                 <ul>
                   <li
                     className={
                       passwordValidation.hasMinLength ? "valid" : "invalid"
                     }
                   >
                     ✓ Ít nhất 8 ký tự
                   </li>
                   <li
                     className={
                       passwordValidation.hasUpperCase ? "valid" : "invalid"
                     }
                   >
                     ✓ Ít nhất 1 chữ hoa
                   </li>
                   <li
                     className={
                       passwordValidation.hasNumber ? "valid" : "invalid"
                     }
                   >
                     ✓ Ít nhất 1 chữ số
                   </li>
                   <li
                     className={
                       passwordValidation.hasSpecialChar ? "valid" : "invalid"
                     }
                   >
                     ✓ Ít nhất 1 ký tự đặc biệt
                   </li>
                 </ul>
               </div>


               <div className="fp-button-group">
                 <button
                   type="submit"
                   className="fp-btn fp-btn-primary"
                   disabled={
                     loading ||
                     !passwordValidation.isValid ||
                     password !== confirmPassword
                   }
                 >
                   {loading ? "Đang đặt lại..." : "Đặt lại mật khẩu"}
                 </button>
                 <button
                   type="button"
                   className="fp-btn"
                   onClick={() => setStep(2)}
                 >
                   Quay lại
                 </button>
               </div>
             </form>
           </div>
         )}


         {/* Hiển thị thông báo */}
         {message && <div className="fp-message success">{message}</div>}


         {error && <div className="fp-message error">{error}</div>}
       </div>
     </div>
   </div>
 );
};


export default ForgotPassword;
