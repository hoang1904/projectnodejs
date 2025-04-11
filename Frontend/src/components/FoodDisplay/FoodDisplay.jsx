<<<<<<< HEAD
import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import Fooditem from '../FoodItem/Fooditem';
import { Link } from 'react-router-dom';

// 🟧 Đã thêm: nhận thêm searchTerm từ props
const FoodDisplay = ({ category, searchTerm }) => {
  const { food_list } = useContext(StoreContext);

  // 🟧 Đã thêm: lọc danh sách món theo category + search term
  const filteredFoods = food_list.filter((item) => {
    const matchCategory = category === "All" || category === item.category;
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });
=======
import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import Fooditem from '../FoodItem/Fooditem'



const FoodDisplay = ({category}) => {

    const{food_list} = useContext(StoreContext)
>>>>>>> ebb187b (admin-edit-order)

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes you must try</h2>
      <div className="food-display-list">
<<<<<<< HEAD
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
=======
        {food_list.map((item,index)=>{
            if(category==="All" || category===item.category){
              return <Fooditem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
            }

            
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
>>>>>>> ebb187b (admin-edit-order)
