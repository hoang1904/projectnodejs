import React, { useContext } from 'react';
import './Fooditem.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Fooditem = ({ id, name, price, description, image, averageRating }) => {
  const { url } = useContext(StoreContext);
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
      <p
  onClick={handleViewDetail}
  className="food-item-name truncate-text"
  style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
  title={name}  // ✅ Tooltip khi hover
>
  {name}
</p>


        {averageRating ? (
          <div className="star-display">
            {"★".repeat(Math.round(averageRating))}
            <span style={{ fontSize: "12px", color: "#999" }}> ({averageRating}/5)</span>
          </div>
        ) : (
          <div className="star-display" style={{ fontSize: "13px", color: "#aaa" }}>
            No ratings yet
          </div>
        )}

        <p className="food-item-desc truncate-text" style={{ textAlign: 'left', marginLeft: '0', paddingLeft: '0' }}>
          {description}
        </p>

        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default Fooditem;
