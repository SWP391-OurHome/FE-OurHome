import React from "react";
import { Link } from "react-router-dom";
import "./SellerSidebar.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const SellerSidebar = () => {
  return (
    <aside className="seller-sidebar">
      <div className="seller-sidebar-header">
        <h2>FLEX LIVING</h2>
      </div>
      <nav className="seller-sidebar-nav">
        <ul>
          <li>
            <Link to="/seller/dashboard">
              <i className="bi bi-house-door"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/seller/analytics">
              <i className="bi bi-bar-chart"></i>
              <span>Analytics</span>
            </Link>
          </li>
          <li>
            <Link to="/seller/add-property">
              <i className="bi bi-plus-square"></i>
              <span>Add Property</span>
            </Link>
          </li>
          <li>
            <Link to="/seller/statscards">
              <i className="bi bi-graph-up"></i>
              <span>Stats</span>
            </Link>
          </li>
          <li>
            <Link to="/seller/profile">
              <i className="bi bi-box-arrow-right"></i>
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/seller/logout">
              <i className="bi bi-box-arrow-right"></i>
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SellerSidebar;