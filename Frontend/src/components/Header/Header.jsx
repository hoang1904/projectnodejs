import React, { useEffect, useState } from 'react';
import './Header.css';

const Header = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    { src: '/header_img.png', textColor: 'rgb(255, 255, 255)' }, // Màu chữ cho ảnh 1
    { src: '/header2_img.png', textColor: 'rgb(0, 0, 0)' }, // Màu chữ cho ảnh 2
    { src: '/header3_img.png', textColor: 'rgb(255, 255, 255)' }, // Màu chữ cho ảnh 3
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 4000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className='header'
      style={{ backgroundImage: `url(${images[currentImage].src})` }}
    >
      <div
        className="header-contents"
        style={{ color: images[currentImage].textColor }}
      >
        <h3>Order here</h3>
        <p>Ordering food online is so simple with us!!!</p>
        <button>Looking for a menu</button>
      </div>
    </div>
  );
};

export default Header;