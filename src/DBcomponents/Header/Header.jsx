import React from "react";
import testpicture from "../../Assets/testpicture.jpg";
import "./AdminHeader.css";

const AdminHeader = () => {
  return (
    <header className="admin-header">
      <h1>Admin Dashboard</h1>
      <div className="admin-user-info">
        <img src={testpicture} alt="User Avatar" className="admin-user-avatar" />
        <span>Admin User</span>
      </div>
    </header>
  );
};

export default AdminHeader;