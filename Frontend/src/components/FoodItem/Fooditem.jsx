<<<<<<< HEAD
import React, { useContext } from 'react';
import './Fooditem.css';
//import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Fooditem = ({ id, name, price, description, image, averageRating }) => {

  const {  url } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(`/product/${id}`);
  };



  return (
    <div className='food-item'>
      <div className="food-item-img-container" onClick={handleViewDetail}>
        <img className='food-item-image' src={`${url}/images/${image}`} alt={name} />

     
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p onClick={handleViewDetail} style={{ cursor: 'pointer' }}>{name}</p>

          {averageRating ? (
            <div className="star-display">
              {"★".repeat(Math.round(averageRating))}
              <span style={{ fontSize: "12px", color: "#999" }}> ({averageRating}/5)</span>
            </div>
          ) : (
            <div className="star-display" style={{ fontSize: "13px", color: "#aaa" }}>
              Chưa có đánh giá
            </div>
          )}
        </div>

        <p className="food-item-desc truncate-text" style={{ textAlign: 'left', marginLeft: '0', paddingLeft: '0' }}>
  {description}
</p>

        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default Fooditem;
=======
import React, { useContext} from 'react'
import './Fooditem.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'


const Fooditem = ({id,name,price,description,image}) => {

  
  const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext)

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={url+"/images/"+image} alt="" />
        {!cartItems[id]
           ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=""  />
           :<div className='food-item-counter'>
              <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt=""/>
              <p>{cartItems[id]}</p>  
              <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
           </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
        
      </div>
    </div>
  )
}

export default Fooditem
>>>>>>> ebb187b (admin-edit-order)
