import React, { useState } from "react";
import "../auth-common.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Password reset link sent to: ${email}`);
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Forgot Password</h2>

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <button type="submit">Send Reset Link</button>

                <p className="login-link">
                    Remember your password? <a href="/login">Go back to login</a>
                </p>
            </form>
        </div>
    );
};

export default ForgotPassword;