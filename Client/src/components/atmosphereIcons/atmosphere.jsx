// atmosphereButton.jsx
import React, { useEffect, useState, useMemo, useRef } from "react";
import Slider from "@mui/material/Slider";
import { useMode } from "../../context/modeContext";
import { useAtmosphereContext } from "../../context/atmosphere";
import { sound } from "../../data/atmosphere";
import "./style.scss";

const AtmosphereButton = ({name}) => {
  const { atmosphere, setAtmosphere } = useMode();
  const { volumes, handleSliderChange, isPlaying, toggleIsPlaying } =
    useAtmosphereContext();
  const [isSlideVisible, setIsSlideVisible] = useState(false);
  const foundSound = useMemo(() => sound.find((a) => a.name === name), []);

  // console.log(foundSound)

  const audioRef = useRef(new Audio(foundSound.pathSound));

  const handleToggle = () => {
    toggleIsPlaying(foundSound.id);
    setAtmosphere(atmosphere === "rain" ? "" : "rain");

    if (atmosphere === "rain") {
      setIsSlideVisible(false);
    } else {
      setIsSlideVisible(true);
      setTimeout(() => {
        setIsSlideVisible(false);
      }, 15000);
    }
  };

  const handleSliderChangeWithCheck = (id, newValue, name) => {
    if (name === "rain") {
      if (newValue === 0) {
        setAtmosphere(""); // Set atmosphere to an empty string when volume is 0
      } else {
        setAtmosphere(name); // Set atmosphere to the name when volume is not 0
      }
    }

    handleSliderChange(id, newValue, name);
  };

  useEffect(() => {
    audioRef.current.volume = volumes[foundSound.id] / 100;

    const playAudio = () => {
      audioRef.current.play().catch((error) => {
        // console.error("Error playing audio:", error);
      });
    };

    const pauseAudio = () => {
      if (!audioRef.current.paused) {
        audioRef.current.pause();
      }
    };

    if (isPlaying[foundSound.id]) {
      playAudio();
    } else {
      pauseAudio();
      audioRef.current.currentTime = 0;
    }

    return () => {
      pauseAudio();
      audioRef.current.currentTime = 0;
      audioRef.current.removeEventListener("ended", pauseAudio);
    };
  }, [isPlaying, volumes, foundSound]);

  return (
    <div className="side-volume">
      <div className={`button-rain ${atmosphere}`} onClick={handleToggle}>
        <div>
          <audio src={foundSound.pathSound} loop />
        </div>
        <img src={foundSound.pathImg} alt="" />
      </div>

      <div className={`slide ${isSlideVisible ? "display-block" : ""}`}>
        <Slider
          value={volumes[foundSound.id]}
          onChange={(e, newValue) =>
            handleSliderChangeWithCheck(
              foundSound.id,
              newValue,
              foundSound.name
            )
          }
          aria-labelledby="continuous-slider"
          sx={{
            color: "#FFF",
            marginLeft: "10px",
            marginRight: "10px",
            width: "100px",
          }}
          className="rage-volume"
        />
      </div>
    </div>
  );
};

export default AtmosphereButton;
