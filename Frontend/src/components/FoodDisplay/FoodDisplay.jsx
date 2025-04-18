import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import Fooditem from '../FoodItem/Fooditem';
import { Link } from 'react-router-dom';

const FoodDisplay = ({ category, searchTerm }) => {
  const { food_list } = useContext(StoreContext);

  // ✅ Chỉ lọc theo category và từ khoá tìm kiếm
  let filteredFoods = food_list.filter((item) => {
    const matchCategory = category === "All" || category === item.category;
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

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
