// List.jsx - Admin chỉnh sửa sản phẩm
import React, { useState, useEffect } from 'react';
import './List.css';
import axios from "axios";
import { toast } from 'react-toastify';
import { FaTrash, FaEdit } from 'react-icons/fa';

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [editFields, setEditFields] = useState({ name: '', price: '', category: '', description: '' });
  const [allCategories, setAllCategories] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      const data = response.data.data;
      setList(data);
      setFilteredList(data);
      const categories = [...new Set(data.map(item => item.category).filter(c => c && c.trim() !== ""))];
setAllCategories(categories);

    } else {
      toast.error("Error fetching food list");
    }
  };

  useEffect(() => { fetchList(); }, []);

  const filterList = (term, category) => {
    let updated = list;
    if (category) updated = updated.filter(i => i.category === category);
    if (term) updated = updated.filter(i => i.name.toLowerCase().includes(term.toLowerCase()));
    setFilteredList(updated);
  };

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setSelectedCategory(val);
    filterList(searchTerm, val);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    filterList(val, selectedCategory);
  };

  const removeFood = async (id) => {
    const res = await axios.post(`${url}/api/food/remove`, { id });
    fetchList();
    res.data.success ? toast.success(res.data.message) : toast.error("Delete error");
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setEditFields({ name: item.name, price: item.price, category: item.category, description: item.description });
  };

  const handleSaveEdit = async () => {
    try {
      const res = await axios.post(`${url}/api/food/update`, {
        id: editingItem._id,
        ...editFields
      });
      if (res.data.success) {
        toast.success("Updated successfully");
        setEditingItem(null);
        fetchList();
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("An error occurred while updating");
    }
  };

  return (
    <div className='list add flex-col'>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px' }}>
        <p>All Foods List</p>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {allCategories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
        </select>
        <input placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
        <span>Showing {filteredList.length} items</span>
      </div>

      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b><b>Name</b><b>Category</b><b>Price</b><b>Action</b>
        </div>
        {filteredList.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/${item.image}`} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <div>
              <FaEdit className="cursor" onClick={() => handleEditClick(item)} style={{ marginRight: '10px' }} />
              <FaTrash className="cursor" onClick={() => removeFood(item._id)} />
            </div>
          </div>
        ))}
      </div>

      {editingItem && (
        <div className="edit-modal">
          <div className="edit-box">
            <h3>Edit Product</h3>
            <input value={editFields.name} onChange={(e) => setEditFields({ ...editFields, name: e.target.value })} placeholder="Name" />
            <input type="number" value={editFields.price} onChange={(e) => setEditFields({ ...editFields, price: e.target.value })} placeholder="Price" />
            <select value={editFields.category} onChange={(e) => setEditFields({ ...editFields, category: e.target.value })}>
              <option value="">Select category</option>
              {allCategories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
            </select>
            <textarea value={editFields.description} onChange={(e) => setEditFields({ ...editFields, description: e.target.value })} placeholder="Description" />
            <div className="edit-actions">
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={() => setEditingItem(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
