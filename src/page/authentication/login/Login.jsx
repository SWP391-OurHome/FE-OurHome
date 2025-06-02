import React, { useState } from "react";
import "./Login.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { login, loginWithGoogle } from "../../../services/authService";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(form.email.trim(), form.password.trim());
      console.log("DATA FROM SERVER:", data);
      if (data.success) {
        toast.success("Login successful!");
        // Lưu token vào localStorage nếu cần: localStorage.setItem("token", data.token)
        navigate("/");
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Server error. Please try again later.");
    }
  };

  const handleGoogleLogin = async () => {
    setMessage("");
    setLoading(true);

    try {
      const response = await authService.loginWithGoogle();
      console.log("Google login initiated:", response);
      // Google OAuth flow will redirect to Google's consent page
    } catch (error) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      setMessage(resMessage);
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
