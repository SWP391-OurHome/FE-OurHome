import React, { useState } from "react";
import "./SellerDashboard.css";
import { Link } from "react-router-dom";
import testpicture from "../../Assets/testpicture.jpg";

// Icons (sử dụng bootstrap-icons)
import "bootstrap-icons/font/bootstrap-icons.css";

const SellerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2>FLEX LIVING</h2>
          <button className="toggle-btn" onClick={toggleSidebar}>
            <i className={`bi ${isSidebarOpen ? "bi-x" : "bi-list"}`}></i>
          </button>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/seller/dashboard">
                <i className="bi bi-list-ul"></i>
                <span>My Listings</span>
              </Link>
            </li>
            <li>
              <Link to="/seller/analytics">
                <i className="bi bi-bar-chart"></i>
                <span>Sales Analytics</span>
              </Link>
            </li>
            <li>
              <Link to="/seller/add-property">
                <i className="bi bi-plus-circle"></i>
                <span>Add Property</span>
              </Link>
            </li>
            <li>
              <Link to="/seller/profile">
                <i className="bi bi-person"></i>
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link to="/logout">
                <i className="bi bi-box-arrow-right"></i>
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`main-content ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
        {/* Header */}
        <header className="dashboard-header">
          <h1>Seller Dashboard</h1>
          <div className="user-info">
            <img
              src={testpicture}
              alt="Seller Avatar"
              className="user-avatar"
            />
            <span>Jane Seller</span>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="stats-cards">
          <div className="card">
            <i className="bi bi-building card-icon"></i>
            <div>
              <h3>12</h3>
              <p>Listings for Sale</p>
            </div>
          </div>
          <div className="card">
            <i className="bi bi-currency-dollar card-icon"></i>
            <div>
              <h3>$120,000</h3>
              <p>Total Sales</p>
            </div>
          </div>
          <div className="card">
            <i className="bi bi-check-circle card-icon"></i>
            <div>
              <h3>5</h3>
              <p>Completed Sales</p>
            </div>
          </div>
        </div>

        {/* Chart Widget */}
        <div className="chart-widget">
          <h2>Sales Overview</h2>
          <div className="chart-placeholder">
            <p>[Chart Placeholder - Use Chart.js or another library to render]</p>
          </div>
        </div>

        {/* Listings Table */}
        <div className="recent-properties">
          <h2>My Listings</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Location</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Modern Apartment</td>
                <td>Đà Nẵng</td>
                <td>8 million/month</td>
                <td><span className="status-available">Available</span></td>
              </tr>
              <tr>
                <td>2</td>
                <td>Luxury Villa</td>
                <td>Đà Nẵng</td>
                <td>25 million/month</td>
                <td><span className="status-sold">Sold</span></td>
              </tr>
              <tr>
                <td>3</td>
                <td>3BR House</td>
                <td>Đà Nẵng</td>
                <td>2.8 billion VND</td>
                <td><span className="status-available">Available</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;