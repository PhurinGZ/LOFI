// Atmospherebtn.jsx
import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { sound } from "../../data/atmosphere";
import { useAtmosphereContext } from "../../context/atmosphere";
import CustomSlider from "./CustomSlider";
import "./styles.scss";

function Atmospherebtn() {
  const { volumes, handleSliderChange, isPlaying } =
    useAtmosphereContext();
  const [isAtmospheresetting, setIsAtmospheresetting] = useState(false);

  const audioRefs = sound.map(() => useRef(null));

  const hahdleBtnClickAtmosphere = () => {
    setIsAtmospheresetting(!isAtmospheresetting);
  };

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

  return (
    <div>
      <div className="btn-atmosphere">
        <button onClick={hahdleBtnClickAtmosphere}>
          <img src="assets/icons/turntable.png" alt="" />
        </button>
      </div>
      {isAtmospheresetting && (
        <Draggable handle=".header-atmos">
          <div className="bg-atmos">
            <div className="header-atmos">
              <span> Atmosphere setting </span>
              <i onClick={hahdleBtnClickAtmosphere}>X</i>
            </div>
            <div className="city-atmos">
              <p> City</p>
              {sound.map((a, index) => {
                if (a.Type === "city") {
                  return (
                    <div className="content-city" key={a.id}>
                      <h1> {a.name} : </h1>
                      <div className="volumeRain">
                        <div>
                          <audio ref={audioRefs[index]} src={a.pathSound} />
                        </div>
                        <CustomSlider
                          volume={volumes[index]}
                          value={volumes[index]}
                          onChange={(event, newValue) =>
                            handleSliderChange(index, newValue)
                          }
                          disableRipple
                        />
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
            <div className="nature-atmos">
              <h1> Nature </h1>
              {sound.map((a, index) => {
                if (a.Type === "nature") {
                  return (
                    <div className="content-city" key={a.id}>
                      <h1> {a.name} : </h1>
                      <div className="volumeRain">
                        <div>
                          <audio ref={audioRefs[index]} src={a.pathSound} />
                        </div>
                        <CustomSlider
                          volume={volumes[index]}
                          value={volumes[index]}
                          onChange={(event, newValue) =>
                            handleSliderChange(index, newValue)
                          }
                          disableRipple
                        />
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </Draggable>
      )}
    </div>
  );
}

export default Atmospherebtn;
