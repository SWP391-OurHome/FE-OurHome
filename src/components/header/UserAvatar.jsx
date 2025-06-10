import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserAvatar.css";

const UserAvatar = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
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
        {user.avatar ? (
          <img src={user.avatar} alt="User avatar" className="user-avatar" />
        ) : (
          <div className="avatar-placeholder">
            {user.name ? user.name[0].toUpperCase() : "U"}
          </div>
        )}
      </div>

      {showDropdown && (
        <div className="avatar-dropdown">
          <div className="user-info">
            <p className="user-name">{user.name}</p>
            <p className="user-email">{user.email}</p>
          </div>
          <div className="dropdown-divider"></div>
          <button
            className="dropdown-item"
            onClick={() => navigate("/profile")}
          >
            Hồ sơ
          </button>
          <button className="dropdown-item" onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
