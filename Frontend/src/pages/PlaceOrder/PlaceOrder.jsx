import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {

  const {getTotalCartAmount} = useContext(StoreContext)

  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery infomation</p>
        <div className="multi-field">
          <input type="text" placeholder='Firt name' />
          <input type="text" placeholder='Last name' />
        </div>
        <input type="email" placeholder='Email' />
        <input type="text" placeholder='Street' />
        <div className="multi-field">
          <input type="text" placeholder='City' />
        </div>
        <input type="text" placeholder='Phone' />
      </div>
      
      
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount () }</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>${getTotalCartAmount() === 0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() ===0?0: getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button>Proceed to payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
