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
              <li key="home">Home</li>
              <li key="about-us">About us</li>
              <li key="delivery">Delivery</li>
              <li key="privacy-policy">Privacy policy</li>
            </ul>
        </div>
        <div  className="footer-content-right">
            <h3>Contact us</h3>
            <ul>
              <li key="phone">123-456-7890</li>
              <li key="email">derectme@tomato.com</li>
            </ul>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.8581690910723!2d106.68427047535981!3d10.822164158347766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174deb3ef536f31%3A0x8b7bb8b7c956157b!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBUUC5IQ00!5e0!3m2!1svi!2s!4v1746194706335!5m2!1svi!2s"
              width="400" 
              height="250" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>  
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright by me and my team. Do not reup@2025</p>
    </div>
  )
}

export default Footer
