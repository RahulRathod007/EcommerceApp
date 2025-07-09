import React, { useState, useEffect } from 'react';
import ProductList from '../components/Product/ProductList';
import Filters from '../components/Product/Filters';

const sliderImages = [
  {
    url: 'https://t3.ftcdn.net/jpg/07/94/31/84/360_F_794318493_zd15A3T9jwufIZbz13GhXleOZlNCu8Vj.jpg',
  },
  {
    url: 'https://static.vecteezy.com/system/resources/previews/011/871/813/non_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg',
  },
  {
    url: 'https://t4.ftcdn.net/jpg/03/48/05/45/360_F_348054579_rsxfPG9B3LJBzE173cXPJAMuGGmBkmKS.jpg',
  },
  {
    url: 'https://img.freepik.com/premium-psd/black-friday-sale-social-media-post-instagram-post-web-banner-facebook-cover-template_220443-1074.jpg?semt=ais_hybrid&w=740',
  },
];

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const nextSlide = () => setCurrent((current + 1) % sliderImages.length);
  const prevSlide = () => setCurrent((current - 1 + sliderImages.length) % sliderImages.length);

  // ⛓ Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ⏱ Auto-slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 2000); // 2 seconds
    return () => clearInterval(interval);
  }, []);

  // 🎨 Style Functions
  const getSliderStyles = () => ({
    width: '100vw',
    height: windowWidth < 768 ? '300px' : '420px',
    backgroundImage: `url(${sliderImages[current].url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    margin: '0 calc(50% - 50vw) 40px calc(50% - 50vw)',
    overflow: 'hidden',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.12)',
  });

  const getNavButtonStyles = () => ({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255, 255, 255, 0.9)',
    border: 'none',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    fontSize: '1.5rem',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.3s, transform 0.2s',
  });

  const getDotStyles = (index) => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: current === index ? '#3498db' : 'rgba(52, 152, 219, 0.5)',
    border: current === index ? '2px solid #2c3e50' : '1px solid #ccc',
    display: 'inline-block',
    transition: 'all 0.3s',
    cursor: 'pointer',
    margin: '0 5px',
  });

  const getHoverFocusStyles = (e) => ({
    background: e.type === 'mouseover' ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.9)',
    transform: e.type === 'mouseover' ? 'scale(1.1)' : 'scale(1)',
  });

  return (
    <div style={{ fontFamily: 'Poppins, Arial, sans-serif', background: '#f7f7f7', minHeight: '100vh', padding: '5px' }}>
      {/* 📸 Image Slider */}
      <div style={getSliderStyles()}>
        {/* Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.2) 100%)',
            zIndex: 1,
          }}
        />
        {/* Caption (optional) */}
        <div
          style={{
            position: 'absolute',
            left: '5%',
            bottom: '20%',
            color: '#ffffff',
            zIndex: 2,
            fontSize: windowWidth < 768 ? '1.5rem' : '2.2rem',
            fontWeight: 700,
            letterSpacing: '1px',
            textShadow: '0 2px 12px rgba(0, 0, 0, 0.3)',
            maxWidth: '50%',
          }}
        >
          {sliderImages[current].caption}
        </div>

        {/* ⬅ Prev Button */}
        <button
          onClick={prevSlide}
          onMouseOver={getHoverFocusStyles}
          onMouseOut={getHoverFocusStyles}
          onFocus={getHoverFocusStyles}
          onBlur={getHoverFocusStyles}
          style={{
            ...getNavButtonStyles(),
            left: '20px',
          }}
          aria-label="Previous Slide"
        >
          ←
        </button>

        {/* ➡ Next Button */}
        <button
          onClick={nextSlide}
          onMouseOver={getHoverFocusStyles}
          onMouseOut={getHoverFocusStyles}
          onFocus={getHoverFocusStyles}
          onBlur={getHoverFocusStyles}
          style={{
            ...getNavButtonStyles(),
            right: '20px',
          }}
          aria-label="Next Slide"
        >
          →
        </button>

        {/* ⭕ Dots */}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '10px',
            zIndex: 2,
          }}
        >
          {sliderImages.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setCurrent(idx)}
              onMouseOver={(e) => Object.assign(e.target.style, { transform: 'scale(1.2)' })}
              onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
              style={getDotStyles(idx)}
            />
          ))}
        </div>
      </div>

      {/* 🛒 Header */}
      <h1
        style={{
          textAlign: 'center',
          color: '#2c3e50',
          fontWeight: 700,
          marginBottom: '2.5rem',
          letterSpacing: '1px',
          fontSize: windowWidth < 768 ? '1.8rem' : '2.5rem',
        }}
      >
        Welcome to the E-commerce Store
      </h1>

      {/* 🧰 Filters + Product List */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 15px' }}>
        <div
          style={{
            width: '100%',
            margin: '0 auto',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            padding: windowWidth < 768 ? '20px' : '32px 24px',
            marginTop: '2.5rem',
          }}
        >
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default Home;
