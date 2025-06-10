import React, { useState } from "react";
import "./AdminUsers.css";

const Users = () => {
  const [viewMode, setViewMode] = useState("Customer");

  const users = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Admin", joined: "2024-06-01" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Seller", joined: "2024-05-15" },
    { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", role: "Buyer", joined: "2024-04-20" },
    { id: 4, name: "Alice Brown", email: "alice.brown@example.com", role: "Buyer", joined: "2024-03-10" },
    { id: 5, name: "Mike Wilson", email: "mike.wilson@example.com", role: "Seller", joined: "2024-02-25" },
  ];

  const filteredUsers = users.filter((user) => {
    if (viewMode === "Customer") return user.role === "Buyer";
    if (viewMode === "Seller") return user.role === "Seller";
    return true;
  });

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "Customer" ? "Seller" : "Customer"));
  };

  return (
    <div className="admin-users">
      <h2>Users</h2>
      <div className="admin-view-toggle">
        <button onClick={toggleViewMode} className="admin-toggle-btn">
          Switch to {viewMode === "Customer" ? "Seller" : "Customer"}
        </button>
      </div>
      <div className="admin-users-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;