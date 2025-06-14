import React from "react";
import "./RecentProperties.css";

const RecentProperties = () => {
  const properties = [
    { id: 1, title: "Modern Apartment", location: "Đà Nẵng", price: "8 million/month", status: "Listed" },
    { id: 2, title: "Luxury Villa", location: "Đà Nẵng", price: "25 million/month", status: "Sold" },
  ];

  return (
    <div className="seller-recent-properties">
      <h2>Recent Properties</h2>
      <div className="seller-properties-list">
        {properties.map((prop) => (
          <div key={prop.id} className="seller-property-card">
            <h3>{prop.title}</h3>
            <p><strong>Location:</strong> {prop.location}</p>
            <p><strong>Price:</strong> {prop.price}</p>
            <p><strong>Status:</strong> <span className={`seller-status-${prop.status.toLowerCase()}`}>{prop.status}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProperties;