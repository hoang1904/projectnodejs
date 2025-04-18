import React, { useEffect, useState } from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/frontend_assets/assets';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ExploreMenu = ({ category, setCategory, sortOption, setSortOption }) => {
  const [bestSellerList, setBestSellerList] = useState([]);
  const navigate = useNavigate();

  const handleSortClick = () => {
    setSortOption(prev => (prev === 'best' ? '' : 'best'));
  };

  useEffect(() => {
    const fetchBestSellers = async () => {
      if (sortOption === 'best') {
        try {
          const res = await axios.get("http://localhost:4000/api/food/best-sellers");
          if (res.data.success) {
            setBestSellerList(res.data.data);
          }
        } catch (err) {
          console.error("❌ Lỗi khi tải Best Seller:", err);
        }
      }
    };
    fetchBestSellers();
  }, [sortOption]);

  return (
    <div className='explore-menu' id='explore-menu'>

      {/* 🔶 Nút lọc “Best Seller” */}
      <div className="menu-filter-bar" style={{ marginBottom: '20px' }}>
        <button
          className={sortOption === 'best' ? 'active' : ''}
          onClick={handleSortClick}
          style={{
            padding: '10px 20px',
            borderRadius: '30px',
            border: '1px solid #ccc',
            backgroundColor: sortOption === 'best' ? '#ffa07a' : '#fff',
            cursor: 'pointer'
          }}
        >
          <h3>🔥 Best Seller</h3>
        </button>
      </div>

      {/* 🔥 Hiển thị danh sách Best Sellers */}
      {sortOption === 'best' && bestSellerList.length > 0 && (
        <div className="best-seller-container">
          <div className="best-seller-title">🔥 Top 5 Best Sellers</div>
          {bestSellerList.map((item, index) => (
            <div
              className="best-seller-item"
              key={index}
              onClick={() => navigate(`/product/${item._id}`)}
              style={{ cursor: 'pointer' }}
            >
              <img src={`http://localhost:4000/images/${item.image}`} alt={item.name} />
              <div className="best-seller-name">{item.name}</div>
              <div className="best-seller-rating">⭐ {item.averageRating || 'N/A'}</div>
            </div>
          ))}
        </div>
      )}

      {/* Danh sách category bình thường */}
      <div className="explore-menu-list" id='1'>
        {menu_list.map((item, index) => (
          <div
            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
            key={index}
            className="explore-menu-list-item"
          >
            <img
              className={category === item.menu_name ? "active" : ""}
              src={item.menu_image}
              alt={item.menu_name}
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;
