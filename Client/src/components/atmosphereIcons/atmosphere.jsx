// atmoshpereButton.jsx
import React, { useRef, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useMode } from "../../context/modeContext";
import Slider from "@mui/material/Slider";
import "./style.scss";

const AtmosphereButton = () => {
  const { atmosphere, setAtmosphere } = useMode();
  const audioRain = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);

  useEffect(() => {
    const audioElement = audioRain.current;

    // เมื่อค่า isPlaying เปลี่ยน
    if (isPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
      audioElement.currentTime = 1; // เริ่มที่ต้นหากต้องการเล่นใหม่
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRain.current) {
      audioRain.current.volume = volume / 100;
    }
  }, [volume]);

  const handleToggle = () => {
    // กำหนดค่า isPlaying ตรงนี้ จะทำให้ useEffect ทำงาน
    setIsPlaying(!isPlaying);

    // Check if the atmosphere is already stored
    if (atmosphere === "rain") {
      // If stored, remove it
      setAtmosphere("");
    } else {
      // If not stored, store it
      setAtmosphere("rain");
    }
  };

  return (
    <div className="side-volume">
      <div className={`button-rain ${atmosphere}`} onClick={handleToggle}>
        <div>
          {/* ใส่ ref ใน <audio> เพื่อให้เข้าถึง element */}
          <audio ref={audioRain} src="/public/assets/soundatmosphere/rain.mp3" />
        </div>
        <img src="/public/assets/icons/rain.png" alt="" />
      </div>
      <Slider
        value={volume}
        onChange={(e, newValue) => setVolume(newValue)}
        aria-labelledby="continuous-slider"
        sx={{
          color: "#FFF",
          marginLeft: "10px",
          marginRight: "10px",
          width: "100px",
        }}
        className="slide-volume"
      />
    </div>
  );
};

export default AtmosphereButton;
