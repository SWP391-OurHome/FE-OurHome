import React from "react";
import testpicture from "../../Assets/testpicture.jpg";
import "./SellerHeader.css";

const SellerHeader = () => {
  return (
    <header className="seller-header">
      <h1>Seller Dashboard</h1>
      <div className="seller-user-info">
        <img src={testpicture} alt="User Avatar" className="seller-user-avatar" />
        <span>Seller User</span>
      </div>
    </header>
  );
};

export default SellerHeader;