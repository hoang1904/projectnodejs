import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import Fooditem from '../FoodItem/Fooditem';
import { Link } from 'react-router-dom';

// 🟧 Nhận thêm sortOption từ props
const FoodDisplay = ({ category, searchTerm, sortOption }) => {
  const { food_list } = useContext(StoreContext);

  // 🟧 Lọc theo danh mục + từ khoá tìm kiếm
  let filteredFoods = food_list.filter((item) => {
    const matchCategory = category === "All" || category === item.category;
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  // 🟧 Nếu chọn “Món bán chạy”, sắp xếp theo đánh giá cao nhất
  if (sortOption === "best") {
    filteredFoods.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
  }

  return (
    <div className='food-display' id='food-display'>
      <div className="food-display-list">
        {filteredFoods.map((item, index) => (
          <Link
            to={`/product/${item._id}`}
            key={index}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Fooditem
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              averageRating={item.averageRating}
              reviewCount={item.reviewCount}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
