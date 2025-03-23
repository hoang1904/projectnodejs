import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/frontend_assets/assets'
import { Link } from 'react-router-dom';

const Navbar = () => {

  const[menu,setMenu] = useState("home");


  return (
    <div className='navbar'>
      <img src={assets.logo} alt="" className="logo" />
        {/* <ul className="navbar-menu">
            <li onClick={()=>setMenu("home")} className={menu===""?"active":""}>Home</li>
            <li onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</li>
            <li onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobile-app</li>
            <li onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact us</li>
        </ul> */}
      <ul className="navbar-menu">
        <Link to='' onClick={()=>setMenu("home")}className={menu==="home"?"active":""}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile-app</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact us</a>
      </ul>


        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
                <img src={assets.basket_icon} alt="" />
                <div className="dot"></div>
            </div>
            <button>Sign in</button>

        </div>

    </div>
  )
}

export default Navbar

