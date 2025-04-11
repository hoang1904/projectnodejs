<<<<<<< HEAD
import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/frontend_assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin, searchTerm, setSearchTerm }) => {
  const [menu, setMenu] = useState("home");

  // 🟧 Đã thêm "url" để hiển thị đúng ảnh trong gợi ý
  const { getTotalCartAmount, logout, token, food_list, url } = useContext(StoreContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const filteredSuggestions = food_list?.filter(item =>
    item.name.toLowerCase().includes((searchTerm || "").toLowerCase())
  ).slice(0, 5);
=======
import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/frontend_assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {

  const[menu,setMenu] = useState("home");

  const {getTotalCartAmount,token,setToken} = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/")
  }

>>>>>>> ebb187b (admin-edit-order)

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
<<<<<<< HEAD

      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
=======
      <ul className="navbar-menu">
        <Link to='/' onClick={()=>setMenu("home")}className={menu==="home"?"active":""}>Home</Link>
>>>>>>> ebb187b (admin-edit-order)
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile-app</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact us</a>
      </ul>

<<<<<<< HEAD
      <div className="navbar-right">
        {/* 🔍 Thanh tìm kiếm */}
        <div className="search-box-wrapper">
          <input
            type="text"
            className="search-box"
            placeholder="Tìm món ăn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={assets.search_icon} alt="search" className="search-icon-right" />

          {/* 🟧 Gợi ý sản phẩm nâng cấp, sửa ảnh */}
          {searchTerm && filteredSuggestions.length > 0 && (
            <div className="suggestion-dropdown">
              {filteredSuggestions.map(item => (
                <div
                  key={item._id}
                  className="suggestion-item-rich"
                  onClick={() => navigate(`/product/${item._id}`)}
                >
                  {/* 🟧 SỬA: nối đúng URL ảnh */}
                  <img src={`${url}/images/${item.image}`} alt={item.name} className="suggestion-img" />
                  
                  <div className="suggestion-info">
                    <div className="suggestion-name">{item.name}</div>
                    <div className="suggestion-price">
                      <span className="new-price">{item.price.toLocaleString()}đ</span>
                      {item.old_price && (
                        <span className="old-price">
                          {item.old_price.toLocaleString()}đ
                        </span>
                      )}
                    </div>
                    {item.gift && (
                      <div className="suggestion-gift">🎁 {item.gift}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="" />
                <p>Order</p>
              </li>
              <hr />
              <li onClick={handleLogout}>
                <img src={assets.logout_icon} alt="Logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
=======

        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
                <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>
            {!token?<button onClick={()=>setShowLogin(true)}>Sign in</button>
            :<div className='navbar-profile'>
              <img src={assets.profile_icon} alt="" />
              <ul className="nav-profile-dropdown">
              <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Order</p></li>
                <hr />
                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>
            </div>}
            

        </div>

    </div>
  )
}

export default Navbar

>>>>>>> ebb187b (admin-edit-order)
