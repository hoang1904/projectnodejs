import React from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/dashboard' className="sidebar-option">
          <img src={assets.dash_board} alt="" />
          <p>Dashboard</p>
        </NavLink>
        <NavLink to='/user' className="sidebar-option">
          <img src={assets.user} alt="" />
          <p>User</p>
        </NavLink>
        <NavLink to='/add' className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add item</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
          <img src={assets.list} alt="" />
          <p>List item</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Order</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
