import React, { useState, useContext } from 'react';
import './LoginPopup.css'; // Tận dụng lại CSS cũ
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const ForgotPassword = ({ setShowForgot, setShowLogin }) => {
  const { url } = useContext(StoreContext);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/user/forgot-password`, { email });
      if (res.data.success) {
        setStatus("✅ A password reset link has been sent to your email. ");
      } else {
        setStatus("❌ " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Sorry, something went wrong while sending the email.");

    }
  };

  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
        <h2 className="forgot-title">Forgot Password</h2>

          <span style={{ cursor: 'pointer' }} onClick={() => setShowForgot(false)}>❌</span>
        </div>
        <div className="login-popup-inputs">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Send Reset Link</button>
{status && <p style={{ color: 'black' }}>{status}</p>}
<p style={{ textAlign: 'center' }}>
  Back to <span onClick={() => {
    setShowForgot(false);
    setShowLogin(true);
  }}>Login</span>
    </p>

      </form>
    </div>
  );
};

export default ForgotPassword;
