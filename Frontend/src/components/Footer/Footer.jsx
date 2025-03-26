import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor pellentesque et nibh tincidunt bibendum Sed in tellus in feugiat dui et enim. Odio feugiat id donec ultricies. Nisi, sed sed pellentesque posuere orci sit sed. Gravida facilisis sollicitudin donec vitae quam ut nibh enim.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
            <h3>Company</h3>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy policy</li>
            </ul>
        </div>
        <div  className="footer-content-right">
            <h3>Contact us</h3>
            <ul>
              <li>123-456-7890</li>
              <li>derectme@tomato.com</li>
            </ul>  
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright by me and my team. Do not reup@2025</p>
    </div>
  )
}

export default Footer
