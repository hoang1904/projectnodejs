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
import ForgotPassword from './components/LoginPopup/ForgotPassword';
import ResetPassword from "./pages/ResetPassword/ResetPassword";

// ✅ Thêm react-toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  // 🟧 Đã thêm: lưu từ khóa tìm kiếm từ Navbar
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      {showLogin && (
        <LoginPopup
          setShowLogin={setShowLogin}
          setShowForgot={setShowForgot}
        />
      )}
      {showForgot && (
        <ForgotPassword
          setShowForgot={setShowForgot}
          setShowLogin={setShowLogin}
        />
      )}

      <div className='app'>

        {/* 🟧 Đã thêm: truyền searchTerm vào Navbar */}
        <Navbar
          setShowLogin={setShowLogin}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <Routes>
          {/* 🟧 Đã thêm: truyền searchTerm vào Home */}
          <Route path='/' element={<Home searchTerm={searchTerm} />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Routes>
      </div>

      <Footer />

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
        theme="light"
      />
    </>
  );
};

export default App;
