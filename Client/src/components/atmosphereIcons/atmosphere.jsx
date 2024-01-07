import React, { useRef, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import { useMode } from "../../context/modeContext";
import { useAtmosphereContext } from "../../context/atmosphere";
import { sound } from "../../data/atmosphere";
import "./style.scss";

const AtmosphereButton = () => {
  const { atmosphere, setAtmosphere } = useMode();
  const { volumes, handleSliderChange, isPlaying } = useAtmosphereContext();
  const [volume, setVolume] = useState(30)

  const audioRefs = sound.map(() => useRef(null));
  console.log("volums :",volumes)
  console.log("volum :",volume)
  const audioElement = useRef(audioRefs);

  useEffect(() => {
    audioRefs.forEach((audioRef, index) => {
      const audioElement = audioRef.current;

      if (isPlaying[index] && audioElement) {
        audioElement.volume = volumes[index] / 100;
        audioElement.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      } else if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 1;
      }
    });
  }, [isPlaying, volumes, audioRefs]);

  const foundSound = sound.find((a) => a.name === "rain");

  const handleToggle = () => {
    
    if (atmosphere === "rain") {
      setAtmosphere("");
    } else {
      setAtmosphere("rain");
    }
  };

  

  return (
    <div className="side-volume">
      <div className={`button-rain ${atmosphere}`} onClick={handleToggle}>
        <div>
          <audio ref={audioElement} src={foundSound.pathSound} />
        </div>
        <img src="/public/assets/icons/rain.png" alt="" />
      </div>
      <Slider
      volume={volumes[foundSound.id]}
        value={volume}
        onChange={(e, newValue) => [setVolume(newValue),handleSliderChange(foundSound.id, newValue)]}
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
