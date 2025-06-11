import React from "react";
import "./AdminTransactions.css";

const Transactions = () => {
  const transactions = [
    { id: 1, property: "Modern Apartment", customer: "John Doe", amount: "8 million/month", status: "Pending" },
    { id: 2, property: "Luxury Villa", customer: "Jane Smith", amount: "25 million/month", status: "Completed" },
    { id: 3, property: "3BR House", customer: "Bob Johnson", amount: "2.8 billion VND", status: "Canceled" },
  ];

  return (
    <div className="admin-transactions">
      <h2>Transactions</h2>
      <div className="admin-transactions-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Property</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.property}</td>
                <td>{transaction.customer}</td>
                <td>{transaction.amount}</td>
                <td>
                  <span className={`admin-status-${transaction.status.toLowerCase()}`}>{transaction.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;