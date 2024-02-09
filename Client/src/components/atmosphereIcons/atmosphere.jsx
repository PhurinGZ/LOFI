// atmosphereButton.jsx

import { useEffect, useState, useRef } from "react";
import Slider from "@mui/material/Slider";
import { useMode } from "../../context/modeContext";
import { useAtmosphereContext } from "../../context/atmosphere";
import { sound } from "../../data/atmosphere";
import "./style.scss";


const AtmosphereButton = ({ name }) => {
  const { atmosphere, setAtmosphere } = useMode();
  const {
    volumes,
    handleSliderChange,
    isPlaying,
    toggleIsPlaying,
    setVolumes,
  } = useAtmosphereContext();
  const [isSlideVisible, setIsSlideVisible] = useState(false);
  const [soundPath, setSoundPath] = useState();

  useEffect(() => {
    const foundSound = sound.find((a) => a.name === name);
    if (foundSound) {
      setSoundPath(foundSound);
    }
  }, [name]);

  const audioRef = useRef(new Audio());

  const { pathSound, id } = soundPath || {};

  useEffect(() => {
    if (soundPath) {
      audioRef.current.src = pathSound;
      audioRef.current.volume = volumes[id] / 100;

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

      if (isPlaying[id]) {
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
    }
  }, [isPlaying, volumes, soundPath]);

  const handleToggle = () => {
    // Clone the volumes array to avoid mutating the original state
    const newVolumes = [...volumes];

    // Check current value at newVolumes[id]
    if (newVolumes[id] === 30) {
      // If current value is 30, set it to 0
      newVolumes[id] = 0;
    } else {
      // If current value is not 30, set it to 30
      newVolumes[id] = 30;
    }

    // Set the updated volumes array
    setVolumes(newVolumes);

    // Toggle playing state
    toggleIsPlaying(id);

    // Update atmosphere if name is "rain"
    if (name === "rain") {
      setAtmosphere(atmosphere === "rain" ? "" : "rain");
    }

    // Update slide visibility based on atmosphere
    if (atmosphere === "rain") {
      setIsSlideVisible(false);
    }
  };

  const handleSliderChangeWithCheck = (newValue, name) => {
    if (name === "rain") {
      setAtmosphere(newValue === 0 ? "" : name);
    }

    handleSliderChange(id, newValue, name);
  };

  return (
    <div className="side-volume">
      {soundPath && (
        <div className={`button-rain ${atmosphere}`} onClick={handleToggle}>
          <div>
            <audio src={pathSound} loop />
          </div>
          <img src={soundPath.pathImg} alt="" />
        </div>
      )}

      <div className={`slide ${isSlideVisible && "display-block"}`}>
        {soundPath && (
          <Slider
            value={volumes[id]}
            onChange={(e, newValue) =>
              handleSliderChangeWithCheck(newValue, soundPath.name)
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
        )}
      </div>
    </div>
  );
};

export default AtmosphereButton;
