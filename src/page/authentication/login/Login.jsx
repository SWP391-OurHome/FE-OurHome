import React, { useState } from "react";
import "../auth-common.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { login, loginWithGoogle } from "../../../services/authService";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(form.email.trim(), form.password.trim());
      console.log("📦 Response from backend:", res);

      if (res.success && res.data) {
        const role = res.data.role?.toLowerCase();

        localStorage.setItem("token", res.data.token || "");
        localStorage.setItem("role", role);

        const user = {
          name: res.data.name,
          email: res.data.email,
          picture: res.data.picture
        };
        localStorage.setItem("user", JSON.stringify(user));

        toast.success("Login successful!");

        if (role === "seller") {
          navigate("/sellerdashboard");
        } else if (role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }else {
        toast.error(res.message || "Invalid login credentials");
      }
    } catch (error) {
      console.error("❌ Login API error:", error);
      toast.error("Server connection error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await loginWithGoogle();
    } catch (error) {
      toast.error("Could not connect to Google");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-background-content">
          <h1>Welcome Back</h1>
          <p>
            Sign in to access your account and continue your journey in finding
            your dream home.
          </p>
        </div>
      </div>

      <div className="auth-content">
        <div className="auth-form-container">
          <div className="auth-header">
            <h2>Sign In</h2>
            <p>Enter your credentials to access your account</p>
          </div>

          <form className="auth-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div
              className="auth-links"
              style={{
                textAlign: "right",
                marginTop: "-10px",
                marginBottom: "20px",
              }}
            >
              <a href="/forgot-password">Forgot password?</a>
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="divider">
              <span>Or continue with</span>
            </div>

            <div className="social-buttons">
              <button
                type="button"
                className="social-button"
                onClick={handleGoogleLogin}
              >
                <FcGoogle style={{ width: "24px", height: "24px" }} />
                <span>Sign in with Google</span>
              </button>
            </div>

            <div className="auth-links" style={{ marginTop: "2rem" }}>
              Don't have an account? <a href="/signup">Create Account</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
