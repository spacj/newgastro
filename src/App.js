import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import './styles/tailwind.css';
import ThreeMain from './components/ThreeMain';
import Prices from './components/pricing';
import Slides from './components/slides';
import AboutUs from './components/aboutus';
import Footer from './components/footer';

function App() {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='app flex-col'>
      <div className='header flex-row w-[100vw] bg-black min-h-[10vh] border-indigo-500 border-2'>
        <div className='logo'><img src='./logogastro.png'/></div>
      </div>
      <div className='nav-mobile'>
        <a className="navmobmenituno" href=''>•••</a>
        <a className="navmobmenitdue" href=''> Login </a>
        <a className="navmobmenitdue" href=''> Register</a>
        <a className="navmobmenitdue" href=''> Pricing </a>
      </div>
      <div className='main'>  
        <div className='three-main'> 
          <ThreeMain scrollPosition={scrollY} className="bro" />
        </div>
        <div className='page-title'>
        <h2>Menù, Websites and Apps <br/> tailored on your needs</h2>
        </div>
        <div className='page-desc'><p> Enjoy your new qrcode menù, website or delivery app in few easy steps.
          <br/> Click below to login or keep reading to learn more about our online services... 
          </p></div>
      </div>
      <Slides />
      <Prices />
      <AboutUs />
      <div className='reviews'></div>
      <Footer/>
    </div>
  );
}

export default App;
