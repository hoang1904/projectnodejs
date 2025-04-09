import React, { useContext, useEffect, useState } from 'react'; 
import './LoginPopup.css';
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";


const LoginPopup = ({setShowLogin,setShowForgot}) => {

  const {url,setToken} = useContext(StoreContext)

    const [currState, setCurrState] = useState("Sign up");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
      });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({...data, [name]: value}));
    };

    const onLogin = async () => {
        event.preventDefault()
        let newUrl = url;
        if (currState === "Login") {
          newUrl += "/api/user/login";
        } 
        else {
          newUrl += "/api/user/register";
        }
    
    
        const response = await axios.post(newUrl, data);
        console.log("✅ Login response:", response.data); // 👈 THÊM DÒNG NÀY
        
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        
          if (response.data.user) {
            localStorage.setItem("userId", response.data.user._id);
            localStorage.setItem("userName", response.data.user.name);
          }
        
          setShowLogin(false);
        }
        
        
        
    }
    

    // useEffect(() => {   
    //     console.log(data);
    // },[data]);


    return (
      <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
          <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
          </div>
          <div className="login-popup-inputs">
            {currState === "Login" ? <></> : (
              <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required />
            )}
            <input name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='Email' required />
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
          </div>
          <button type='submit'>
            {currState === "Sign up" ? "Create a new account" : "Login"}
          </button>
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>Accept a policy to continue</p>
          </div>

          {currState === "Login" ? (
            <>
              <p style={{ textAlign: 'center' }}>
                Create a new account{' '}
                <span onClick={() => setCurrState("Sign up")} style={{ color: "#eb6c3e", fontWeight: "500", cursor: "pointer" }}>
                  Click here
                </span>
              </p>
              <p style={{ textAlign: 'center', marginTop: "5px" }}>
                Forgot your password?{' '}
                <span onClick={() => {
                  setShowLogin(false);
                  setShowForgot(true);
                }} style={{ color: "#eb6c3e", fontWeight: "500", cursor: "pointer" }}>
                  Click here
                </span>
              </p>
            </>
          ) : (
            <p style={{ textAlign: 'center' }}>
              Already have an account{' '}
              <span onClick={() => setCurrState("Login")}
                style={{ color: "#eb6c3e", fontWeight: "500", cursor: "pointer" }}>
                Login here
              </span>
            </p>
          )}
        </form>
      </div>
    );
}

export default LoginPopup;
