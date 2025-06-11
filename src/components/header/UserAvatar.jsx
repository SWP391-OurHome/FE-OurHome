import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserAvatar.css";

const UserAvatar = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    console.log("🧪 User from localStorage:", userData);
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-avatar-container")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="user-avatar-container">
      <div
        className="avatar-wrapper"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {user.picture ? (
            <img src={user.picture} alt="User avatar" className="user-avatar" />
        ) : (
            <div className="avatar-placeholder">
              {user.name ? user.name[0].toUpperCase() : "U"}
            </div>
        )}

      </div>

      {showDropdown && (
          <div className="avatar-dropdown">
            <div className="user-info-customer">

              <div className="user-details-customer">
                <p className="user-name-customer">{user.name}</p>
                <p className="user-email-customer">{user.email}</p>
              </div>
            </div>
            <div className="dropdown-divider"></div>
            <button className="dropdown-item" onClick={() => navigate("/profile")}>
              Profile
            </button>
            <button className="dropdown-item" onClick={() => navigate("/changepassword")}>
              Change Password
            </button>
            <button className="dropdown-item" onClick={handleLogout}>
              LogOut
            </button>
          </div>
      )}

    </div>
  );
};

export default UserAvatar;
