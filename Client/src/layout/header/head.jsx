import React, { useState } from 'react';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { Link } from "react-router-dom";
import DarkLightSwitch from '../../components/dark-light/darklight';
import './styles.scss';



const Header = () => {
  const [fullscreen, setFullscreen] = useState(false);

  const fullscreenHandler = () => {
    if (!fullscreen) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  return (
    <nav className="nav-bar">
      <Link to='#' style={{ textDecoration: 'none',paddingLeft:"10px"}}>
        <h1 style={{color:'#fff',fontSize:'1.5rem', }}>LOFI</h1>
      </Link>
      <div className="nav-menu"></div>
      <div className="nav-menu">
        <DarkLightSwitch  />
        <FullscreenIcon
        fontSize='large'
        onClick={fullscreenHandler} className="fullscreen-btn" />
      </div>
    </nav>
  );
};

export default Header;
