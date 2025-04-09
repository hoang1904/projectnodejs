import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/Verify/Verify';
import MyOrders from "./pages/MyOrders/MyOrders";
import ProductDetail from './pages/ProductDetail/ProductDetail';
import ForgotPassword from './components/LoginPopup/ForgotPassword'; // 🔥 Đã thêm
import ResetPassword from "./pages/ResetPassword/ResetPassword"; 

// ✅ Thêm react-toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showForgot, setShowForgot] = useState(false); // 🔥 Đã thêm
  return (
    <>
      {/* Popup đăng nhập */}
      {showLogin && (
        <LoginPopup
          setShowLogin={setShowLogin}
          setShowForgot={setShowForgot} // 🔥 Đã thêm prop này
        />
      )}
      {showForgot && (
        <ForgotPassword
          setShowForgot={setShowForgot} // 🔥 Đã thêm
          setShowLogin={setShowLogin}   // 🔥 Đã thêm
        />
      )}
      
      <div className='app'>   
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/reset-password' element={<ResetPassword />} /> {/* 🔥 Đã thêm */}
        </Routes>
      </div>

      <Footer />

      {/* ✅ Thêm container để hiển thị toast ở mọi trang */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // hoặc "dark"
      />
    </>
  );
};

export default App;
