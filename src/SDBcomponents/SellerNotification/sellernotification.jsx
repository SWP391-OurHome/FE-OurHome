import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './SellerNotifications.css';

const Notifications = () => {
  const { state } = useLocation();
  const [userContacts, setUserContacts] = useState([]);

  useEffect(() => {
    const fetchUserContacts = async () => {
      try {
        const sellerId = 3; // Giả sử sellerId là 3, có thể lấy từ context hoặc localStorage
        const response = await axios.get(`http://localhost:8082/api/user-contacts?sellerId=${sellerId}`);
        setUserContacts(response.data); // Lấy danh sách user_contacts của seller
      } catch (error) {
        console.error('Error fetching user contacts:', error);
      }
    };
    fetchUserContacts();
  }, []);

  return (
    <div className="seller-notifications">
      <h2>Notifications</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Email</th>
            <th>Response Status</th>
          </tr>
        </thead>
        <tbody>
          {userContacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.id}</td>
              <td>{contact.name}</td>
              <td>{contact.phone}</td>
              <td>{new Date(contact.date).toLocaleString()}</td>
              <td>{contact.email}</td>
              <td>{contact.responseStatus}</td>
            </tr>
          ))}
          {state?.userContact && (
            <tr key={state.userContact.id}>
              <td>{state.userContact.id}</td>
              <td>{state.userContact.name}</td>
              <td>{state.userContact.phone}</td>
              <td>{new Date(state.userContact.date).toLocaleString()}</td>
              <td>{state.userContact.email}</td>
              <td>{state.userContact.responseStatus}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Notifications;