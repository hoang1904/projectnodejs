import React, { useState, useEffect } from 'react';
import './List.css';
import axios from "axios";
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
      setFilteredList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const filterList = (term, category) => {
    let updatedList = list;

    if (category) {
      updatedList = updatedList.filter(item => item.category === category);
    }

    if (term) {
      updatedList = updatedList.filter(item =>
        item.name.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredList(updatedList);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    filterList(searchTerm, category);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterList(term, selectedCategory);
  };

  const removeFood = async (foodID) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodID });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  return (
    <div className='list add flex-col'>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px' }}>
        <p>All Foods List</p>

        <select
          style={{ padding: '5px', borderRadius: '5px' }}
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {[...new Set(list.map(item => item.category))].map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search food..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            padding: '5px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
        />

        <span style={{ fontSize: "14px", color: "#555" }}>
          Showing {filteredList.length} item{filteredList.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {filteredList.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/${item.image}`} alt="" />
            <p style={{ padding: '0px' }}>{item.name}</p>
            <p style={{ padding: '0px' }}>{item.category}</p>
            <p style={{ padding: '0px' }}>${item.price}</p>
            <p style={{ padding: '15px' }} onClick={() => removeFood(item._id)} className='cursor'>X</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;