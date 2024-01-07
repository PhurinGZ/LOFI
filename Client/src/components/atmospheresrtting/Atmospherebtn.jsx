// Atmospherebtn.jsx
import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { sound } from "../../data/atmosphere";
import { useAtmosphereContext } from "../../context/atmosphere";
import CustomSlider from "./CustomSlider";
import "./styles.scss";

function Atmospherebtn() {
  const { volumes, handleSliderChange, isPlaying } = useAtmosphereContext();
  const [isAtmospheresetting, setIsAtmospheresetting] = useState(false);

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
      <Draggable handle=".header-atmos">
        <div
          className={`bg-atmos ${isAtmospheresetting ? "display-block" : ""}`}
        >
          <div className="header-atmos">
            <span> Atmosphere setting </span>
            <i onClick={handleBtnCloseClick}>X</i>
          </div>
          <div className="scoll-mouns">
            <div className="city-atmos">
              <p> City</p>
              {sound.map((a, index) => {
                if (a.Type === "city") {
                  return (
                    <div className="content-city" key={a.id}>
                      <h1
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "40%",
                        }}
                      >
                        {" "}
                        <h4> {a.name} </h4> <h4>:</h4>{" "}
                      </h1>
                      <div className="volumeRain">
                        <div>
                          <audio ref={audioRefs[a.id]} src={a.pathSound} />
                        </div>
                        <CustomSlider
                          volume={volumes[a.id]}
                          value={volumes[a.id]}
                          onChange={(event, newValue) =>
                            handleSliderChange(a.id, newValue, a.name)
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
              <p> Nature </p>
              {sound.map((a, index) => {
                if (a.Type === "nature") {
                  return (
                    <div className="content-city" key={a.id}>
                      <h1
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "40%",
                        }}
                      >
                        {" "}
                        <h4> {a.name} </h4> <h4>:</h4>{" "}
                      </h1>
                      <div className="volumeRain">
                        <div>
                          <audio ref={audioRefs[a.id]} src={a.pathSound} />
                        </div>
                        <CustomSlider
                          volume={volumes[a.id]}
                          value={volumes[a.id]}
                          onChange={(event, newValue) =>
                            handleSliderChange(a.id, newValue, a.name)
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
        </div>
      </Draggable>
      
    </div>
  );
}

export default Atmospherebtn;
