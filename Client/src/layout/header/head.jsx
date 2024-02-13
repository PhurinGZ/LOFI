// head.jsx
import React, { useEffect, useState } from "react";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { Link } from "react-router-dom";
import DarkLightSwitch from "../../components/dark-light/darklight";
import "./styles.scss";
import { useMode } from "../../context/modeContext";

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

  const { changedImage } = useMode();

  const [isVisible, setIsVisble] = useState(true);

  useEffect(() => {
    if (changedImage.name === "reality") {
      setIsVisble(false);
    }else if (changedImage.name === "interact") {
      setIsVisble(false);
    }else {
      setIsVisble(true);
    }
  });

  return (
    <nav className="nav-bar">
      <Link to="#" style={{ textDecoration: "none" }}>
        <div className="logo">
          <img src="./assets/icons/logo-1.gif" />
          {/* <h1> LOFI </h1> */}
        </div>
      </Link>
      <div className="nav-menu"></div>
      <div className="nav-menu">
        {isVisible && <DarkLightSwitch />}
        <FullscreenIcon
          fontSize="large"
          onClick={fullscreenHandler}
          className="fullscreen-btn"
        />
      </div>
    </nav>
  );
};

export default Header;
