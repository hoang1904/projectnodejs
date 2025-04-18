<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './User.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

const User = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:4000/api/user/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Error loading user:', err));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:4000/api/user/update/${editingUser._id}`, editingUser);
      alert('Update successful');
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Error updating user");
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:4000/api/user/delete/${userId}`);
        fetchUsers();
      } catch (err) {
        console.error("Lỗi xoá user:", err);
        alert("Delete failed");
      }
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="user-container">
      <div className="user-filter-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or email..."
        />
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="">All roles</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
      </div>

      <div className="list-table-format title">
        <div>#</div>
        <div>Name</div>
        <div>Email</div>
        <div>Role</div>
        <div>ID</div>
        <div>Action</div>
      </div>

      {filteredUsers.map((user, index) => (
        <div className="list-table-format user-row" key={user._id}>
          <div>{index + 1}</div>
          <div className="user-name">{user.name}</div>
          <div className="user-email">{user.email}</div>
          <div className="user-role">{user.role || 'User'}</div>
          <div style={{ fontSize: '11px', color: '#777' }}>{user._id.slice(0, 6)}...</div>
          <div className="user-actions">
            <FaEdit onClick={() => setEditingUser(user)} style={{ cursor: 'pointer', marginRight: '10px' }} />
            <FaTrash onClick={() => handleDelete(user._id)} style={{ cursor: 'pointer', color: '#d9534f' }} />
          </div>
        </div>
      ))}

      {editingUser && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Modify user</h3>
            <input
              type="text"
              value={editingUser.name}
              onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
              placeholder="Name"
            />
            <input
              type="email"
              value={editingUser.email}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
              placeholder="Email"
            />
            <select
              value={editingUser.role}
              onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
            <div className="modal-buttons">
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setEditingUser(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
=======
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './User.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

const User = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:4000/api/user/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Error loading user:', err));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:4000/api/user/update/${editingUser._id}`, editingUser);
      alert('Update successful');
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Error updating user");
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:4000/api/user/delete/${userId}`);
        fetchUsers();
      } catch (err) {
        console.error("Lỗi xoá user:", err);
        alert("Delete failed");
      }
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="user-container">
      <div className="user-filter-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or email..."
        />
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="">All roles</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
      </div>

      <div className="list-table-format title">
        <div>#</div>
        <div>Name</div>
        <div>Email</div>
        <div>Role</div>
        <div>ID</div>
        <div>Action</div>
      </div>

      {filteredUsers.map((user, index) => (
        <div className="list-table-format user-row" key={user._id}>
          <div>{index + 1}</div>
          <div className="user-name">{user.name}</div>
          <div className="user-email">{user.email}</div>
          <div className="user-role">{user.role || 'User'}</div>
          <div style={{ fontSize: '11px', color: '#777' }}>{user._id.slice(0, 6)}...</div>
          <div className="user-actions">
            <FaEdit onClick={() => setEditingUser(user)} style={{ cursor: 'pointer', marginRight: '10px' }} />
            <FaTrash onClick={() => handleDelete(user._id)} style={{ cursor: 'pointer', color: '#d9534f' }} />
          </div>
        </div>
      ))}

      {editingUser && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Modify user</h3>
            <input
              type="text"
              value={editingUser.name}
              onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
              placeholder="Name"
            />
            <input
              type="email"
              value={editingUser.email}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
              placeholder="Email"
            />
            <select
              value={editingUser.role}
              onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
            <div className="modal-buttons">
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setEditingUser(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
>>>>>>> origin/Sang
