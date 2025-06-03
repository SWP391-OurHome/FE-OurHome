import React, { useState } from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import testpicture from "../../Assets/testpicture.jpg";

// Icons (sử dụng bootstrap-icons)
import "bootstrap-icons/font/bootstrap-icons.css";

const Dashboard = () => {
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
              <Link to="/dashboard">
                <i className="bi bi-house-door"></i>
                <span>Overview</span>
              </Link>
            </li>
            <li>
              <Link to="/analytics">
                <i className="bi bi-bar-chart"></i>
                <span>Analytics</span>
              </Link>
            </li>
            <li>
              <Link to="/properties">
                <i className="bi bi-building"></i>
                <span>Properties</span>
              </Link>
            </li>
            <li>
              <Link to="/users">
                <i className="bi bi-people"></i>
                <span>Users</span>
              </Link>
            </li>
            <li>
              <Link to="/settings">
                <i className="bi bi-gear"></i>
                <span>Settings</span>
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
          <h1>Dashboard</h1>
          <div className="user-info">
            <img
              src={testpicture}
              alt="User Avatar"
              className="user-avatar"
            />
            <span>John Doe</span>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="stats-cards">
          <div className="card">
            <i className="bi bi-building card-icon"></i>
            <div>
              <h3>150</h3>
              <p>Total Properties</p>
            </div>
          </div>
          <div className="card">
            <i className="bi bi-people card-icon"></i>
            <div>
              <h3>1,200</h3>
              <p>Total Users</p>
            </div>
          </div>
          <div className="card">
            <i className="bi bi-currency-dollar card-icon"></i>
            <div>
              <h3>$50,000</h3>
              <p>Revenue</p>
            </div>
          </div>
        </div>

        {/* Chart Widget */}
        <div className="chart-widget">
          <h2>Revenue Overview</h2>
          <div className="chart-placeholder">
            <p>[Chart Placeholder - Use Chart.js or another library to render]</p>
          </div>
        </div>

        {/* Recent Properties Table */}
        <div className="recent-properties">
          <h2>Recent Properties</h2>
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
                <td><span className="status-rented">Rented</span></td>
              </tr>
              <tr>
                <td>2</td>
                <td>Luxury Villa</td>
                <td>Đà Nẵng</td>
                <td>25 million/month</td>
                <td><span className="status-available">Available</span></td>
              </tr>
              <tr>
                <td>3</td>
                <td>3BR House</td>
                <td>Đà Nẵng</td>
                <td>2.8 billion VND</td>
                <td><span className="status-sold">Sold</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;