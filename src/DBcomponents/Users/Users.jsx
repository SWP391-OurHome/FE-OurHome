import React, { useState, useEffect } from 'react';
import './AdminUsers.css';
import { getAllUsers, updateUserRole, banUser } from '../../services/adminService';
import { FaLock, FaUnlock, FaEdit } from 'react-icons/fa';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [editRoleId, setEditRoleId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showBanned, setShowBanned] = useState('all');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        console.log('Data received from backend:', data);
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const roleOptions = [
    { id: 'all', name: 'All' },
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Customer' },
    { id: 3, name: 'Seller' },
  ];

  const filteredUsers = users
      .filter((user) => {
        if (selectedRole === 'all') return true;
        return user.roleId === parseInt(selectedRole);
      })
      .filter((user) => {
        if (showBanned === 'all') return true;
        return user.isBanned === (showBanned === 'banned');
      })
      .filter((user) => {
        const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
        return (
            fullName.includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phone.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleRoleChange = async (userId, roleId) => {
    try {
      await updateRole(userId, roleId);
      setUsers(users.map((user) =>
          user.userID === userId ? { ...user, roleId, roleName: roleOptions.find(r => r.id === roleId)?.name } : user
      ));
      setEditRoleId(null); // Close the dropdown after saving
      alert('Role updated successfully');
    } catch (err) {
      alert('Failed to update role');
    }
  };

  const handleBanUser = async (userId, isBanned) => {
    try {
      await banUser(userId);
      setUsers(users.map((user) =>
          user.userID === userId ? { ...user, isBanned: !isBanned } : user
      ));
      alert(`User ${isBanned ? 'unbanned' : 'banned'} successfully`);
    } catch (err) {
      alert(`Failed to ${isBanned ? 'unban' : 'ban'} user`);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = () => {
    setCurrentPage(1); // Reset to first page on search
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
      <div className="admin-users">
        <h2>Users</h2>
        <div className="admin-view-toggle">
          <select
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value);
                setCurrentPage(1);
              }}
              className="filter-select"
          >
            {roleOptions.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
            ))}
          </select>
          <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(parseInt(e.target.value));
                setCurrentPage(1);
              }}
              className="filter-select"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
          <select
              value={showBanned}
              onChange={(e) => {
                setShowBanned(e.target.value);
                setCurrentPage(1);
              }}
              className="filter-select"
          >
            <option value="all">All</option>
            <option value="banned">Banned</option>
            <option value="unbanned">Unbanned</option>
          </select>
          <div className="search-container">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, or phone"
                className="search-input"
            />
            <button onClick={handleSearch} className="search-btn">Search</button>
          </div>
        </div>
        <div className="admin-users-table">
          <table>
            <thead>
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {currentUsers.map((user, index) => (
                <tr key={user.userID}>
                  <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                  <td>{`${user.firstName} ${user.lastName}`}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    {editRoleId === user.userID ? (
                        <select
                            value={user.roleId}
                            onChange={(e) => handleRoleChange(user.userID, parseInt(e.target.value))}
                            className="role-select"
                            onBlur={() => setEditRoleId(null)}
                        >
                          {roleOptions.filter(r => r.id !== 'all').map((role) => (
                              <option key={role.id} value={role.id}>
                                {role.name}
                              </option>
                          ))}
                        </select>
                    ) : (
                        <span onClick={() => setEditRoleId(user.userID)} style={{ cursor: 'pointer' }}>
                        {user.roleName || roleOptions.find(r => r.id === user.roleId)?.name || 'Unknown'}
                      </span>
                    )}
                  </td>
                  <td>
                    <button
                        onClick={() => handleBanUser(user.userID, user.isBanned)}
                        className={`ban-btn ${user.isBanned ? 'banned' : 'unbanned'}`}
                        title={user.isBanned ? 'Unban User' : 'Ban User'}
                    >
                      {user.isBanned ? <FaLock /> : <FaUnlock />}
                    </button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={currentPage === number ? 'active' : ''}
              >
                {number}
              </button>
          ))}
        </div>
      </div>
  );
};

export default Users;