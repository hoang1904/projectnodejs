import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import Fooditem from '../FoodItem/Fooditem';
import { Link } from 'react-router-dom';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes you must try</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
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
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
