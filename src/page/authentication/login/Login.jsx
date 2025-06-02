import React, { useState } from "react";
import "./Login.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { login, loginWithGoogle } from "../../../services/authService";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(form.email.trim(), form.password.trim());
      if (data.success) {
        // Lưu thông tin user vào localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        toast.success("Đăng nhập thành công!");
        navigate("/");
      } else {
        toast.error(data.message || "Thông tin đăng nhập không chính xác");
      }
    } catch (error) {
      toast.error("Lỗi server. Vui lòng thử lại sau.");
    }
  };

  const handleGoogleLogin = async () => {
    setMessage("");
    setLoading(true);
    try {
      const response = await loginWithGoogle();
      if (response.success) {
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", response.token);
        toast.success("Đăng nhập Google thành công!");
        navigate("/");
      } else {
        toast.error(response.message || "Đăng nhập Google thất bại");
      }
    } catch (error) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setMessage(resMessage);
      toast.error("Lỗi đăng nhập Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>

          <div className="social-login">
            <div className="divider">
              <span>Or continue with</span>
            </div>
            <button
              type="button"
              className="google-login-btn"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="google-icon" />
              <span>Sign in with Google</span>
            </button>
          </div>

          <p className="login-link">
            Don't have an account? <a href="/signup">Register</a>
          </p>

          <p className="forgot-password">
            <a href="/forgot-password">Forgot your password?</a>
          </p>
        </form>
      </div>
      <div className="login-right"></div>
    </div>
  );
};

export default Login;
