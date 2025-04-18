import React, { useContext, useState, useEffect } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    if (isPlacingOrder) return;
    setIsPlacingOrder(true);

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    try {
      let orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 2,
        userId: localStorage.getItem("userId")
      };

      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token }
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("❌ Order failed: " + response.data.message);
      }
    } catch (err) {
      console.error("❌ Failed to place order:", err);
      alert("An error occurred while placing the order.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  useEffect(() => {
    if (!token || getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-field">
          <input name='firstName' required type="text" placeholder='First Name' value={data.firstName} onChange={onChangeHandler} />
          <input name='lastName' required type="text" placeholder='Last Name' value={data.lastName} onChange={onChangeHandler} />
        </div>
        <input name='email' required type="email" placeholder='Email' value={data.email} onChange={onChangeHandler} />
        <input name='street' required type="text" placeholder='Street' value={data.street} onChange={onChangeHandler} />
        <div className="multi-field">
          <input name='city' required type="text" placeholder='City' value={data.city} onChange={onChangeHandler} />
          <input name='state' required type="text" placeholder='State' value={data.state} onChange={onChangeHandler} />
        </div>
        <div className="multi-field">
          <input name='zipcode' required type="text" placeholder='Zipcode' value={data.zipcode} onChange={onChangeHandler} />
          <input name='country' required type="text" placeholder='Country' value={data.country} onChange={onChangeHandler} />
        </div>
        <input name='phone' required type="text" placeholder='Phone' value={data.phone} onChange={onChangeHandler} />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() + 2}</b>
            </div>
          </div>

          <button type='submit' disabled={isPlacingOrder}>
            {isPlacingOrder ? "Processing..." : "Proceed to payment"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
