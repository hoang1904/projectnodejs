import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './User.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:4000/api/user/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Lỗi khi load user:', err));
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa người dùng này?");
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`http://localhost:4000/api/user/delete/${id}`);
      alert("Xóa người dùng thành công");
      fetchUsers(); // cập nhật lại danh sách
    } catch (err) {
      console.error("Lỗi khi xóa user:", err);
      alert("Có lỗi xảy ra khi xóa người dùng");
    }
  };
  

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:4000/api/user/update/${editingUser._id}`, editingUser);
      alert('Cập nhật thành công');
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Lỗi update user:", err);
      alert("Lỗi khi cập nhật user");
    }
  };

  return (
    <div className="user-container">
      <p>List user</p>

      <div className="list-table-format title">
        <div>#</div>
        <div>Name</div>
        <div>Email</div>
        <div style={{padding : '15px'}}>Role</div>
        <div>Action</div>
      </div>

      {/* Danh sách user */}
      {users.map((user, index) => (
        <div className="list-table-format" key={user._id}>
        <div>{index + 1}</div>
        <div>{user.name}</div>
        <div>{user.email}</div>
        <div style={{ padding: '15px' }}>{user.role || 'User' || 'Staff' || 'Admin'}</div>
        <div>
          <button onClick={() => setEditingUser(user)}>✏️</button>
          <button onClick={() => handleDelete(user._id)} style={{ marginLeft: '10px' }}>🗑️</button>
        </div>
      </div>
      ))}


      {/* Modal chỉnh sửa */}
      {editingUser && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit user</h3>
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
            <input
              type="text"
              value={editingUser.role}
              onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
              placeholder="Role"
            />
            <div className="modal-buttons">
              <div className="save">
                <button onClick={handleUpdate}>Save</button>
              </div>
              <div className="close">
                <button onClick={() => setEditingUser(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
