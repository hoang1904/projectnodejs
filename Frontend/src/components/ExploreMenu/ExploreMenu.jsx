import React from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/frontend_assets/assets';

const ExploreMenu = ({ category, setCategory, sortOption, setSortOption }) => {

  const handleSortClick = () => {
    // 🔁 Toggle bật/tắt lọc bán chạy
    setSortOption(prev => (prev === 'best' ? '' : 'best'));
  };

  return (
    <div className='explore-menu' id='explore-menu'>

      {/* 🔶 Nút lọc “Món bán chạy” có toggle */}
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
          🔥 Món bán chạy
        </button>
      </div>

      <div className="explore-menu-list" id='1'>
        {menu_list.map((item, index) => {
          return (
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
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMenu;
