import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { sound } from "../../data/atmosphere";
import { useAtmosphereContext } from "../../context/atmosphere";
import CustomSlider from "./CustomSlider";
import CloseIcon from "@mui/icons-material/Close";
import "./styles.scss";
import { useMode } from "../../context/modeContext";

function Atmospherebtn() {
  const { volumes, handleSliderChange, isPlaying, toggleIsPlaying } =
    useAtmosphereContext();
  const [isAtmospheresetting, setIsAtmospheresetting] = useState(false);
  const { atmosphere, setAtmosphere, changedImage } = useMode();

  const audioRefs = sound.map(() => useRef(null));

  const hahdleBtnClickAtmosphere = () => {
    setIsAtmospheresetting(true);
  };

  const handleBtnCloseClick = () => {
    setIsAtmospheresetting(false);
  };

  useEffect(() => {
    audioRefs.forEach((audioRef, index) => {
      const audioElement = audioRef.current;

      if (isPlaying[index] && audioElement) {
        // Check if the current atmosphere is reality, set volume to 0 if it is
        const newVolume =  volumes[index] / 100; //changedImage.name === "reality" ? 0 :
        
        audioElement.volume = newVolume;

        // If the atmosphere is not reality and volume is not 0, play the audio
        if (newVolume > 0) { //changedImage.name !== "reality" && 
          audioElement.play().catch((error) => {
            console.error("Error playing audio:", error);
          });
        } else {
          // If the atmosphere is reality or volume is 0, pause and reset the audio
          audioElement.pause();
          audioElement.currentTime = 0;
        }
      }
    });
  }, [isPlaying, volumes, audioRefs, changedImage]);

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

  return (
    <div>
      <div className="btn-atmosphere">
        <button onClick={hahdleBtnClickAtmosphere}>
          <img src="assets/icons/turntable.png" alt="" />
        </button>
      </div>
      <Draggable handle=".header-atmos">
        <div
          className={`bg-atmos ${isAtmospheresetting ? "display-block" : ""}`}
        >
          <div className="header-atmos">
            <span> Atmosphere setting </span>
            <CloseIcon
              onClick={handleBtnCloseClick}
              style={{ marginRight: "10px", cursor: "pointer" }}
            />
          </div>
          <div className="scoll-mouns">
            <div className="city-atmos">
              <p> City</p>
              {sound.map((a, index) => {
                if (a.Type === "city") {
                  return (
                    <div className="content-city" key={a.id}>
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "40%",
                        }}
                      >
                        {" "}
                        <h4> {a.name} </h4> <h4>:</h4>{" "}
                      </span>
                      <div className="volumeRain">
                        <div>
                          <audio ref={audioRefs[a.id]} src={a.pathSound} loop />
                        </div>
                        <CustomSlider
                          index={a.pathImg}
                          volume={volumes[a.id]}
                          value={volumes[a.id]}
                          onChange={(event, newValue) =>
                            handleSliderChangeWithCheck(a.id, newValue, a.name)
                          }
                          // disabled={changedImage.name === "reality"}
                        />
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
            <div className="nature-atmos">
              <p> Nature </p>
              {sound.map((a, index) => {
                if (a.Type === "nature") {
                  return (
                    <div className="content-city" key={a.id}>
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "40%",
                        }}
                      >
                        {" "}
                        <h4> {a.name} </h4> <h4>:</h4>{" "}
                      </span>
                      <div className="volumeRain">
                        <div>
                          <audio ref={audioRefs[a.id]} src={a.pathSound} loop />
                        </div>
                        <CustomSlider
                          index={a.pathImg}
                          volume={volumes[a.id]}
                          value={volumes[a.id]}
                          onChange={(event, newValue) =>
                            handleSliderChangeWithCheck(a.id, newValue, a.name)
                          }
                          // disabled={changedImage.name === "reality"}
                        />
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </Draggable>
    </div>
  );
}

export default Atmospherebtn;
