// AtmosphereSetting.jsx
import { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { sound } from "../../data/atmosphere";
import { useAtmosphereContext } from "../../context/atmosphere";
import CustomSlider from "./CustomSlider";
import CloseIcon from "@mui/icons-material/Close";
import "./styles.scss";
import { useMode } from "../../context/modeContext";

function Atmospherebtn() {
  const { volumes, handleSliderChange, isPlaying, setIsPlaying } =
    useAtmosphereContext();
  const [isAtmospheresetting, setIsAtmospheresetting] = useState(false);
  const { setAtmosphere, changedImage } = useMode();
  const [prevChangeImage, setPrevChangeImage] = useState("");

  const audioRefs = sound.map(() => useRef(null));

  // console.log("prevChangeImage : ", prevChangeImage);
  // console.log("currentChangeImage : ", changedImage.name);

  const hahdleBtnClickAtmosphere = () => {
    setIsAtmospheresetting(true);
  };

  const handleBtnCloseClick = () => {
    setIsAtmospheresetting(false);
  };

  useEffect(() => {
    audioRefs.forEach((audioRef, index) => {
      const audioElement = audioRef.current;

      if (prevChangeImage !== changedImage.name && audioElement) {
        // Pause and reset the audio when changedImage is updated
        audioElement.pause();
        audioElement.currentTime = 0; // Reset the audio to the beginning
        audioElement.volume = 0;

        // Update the context with the new volumes
        setIsPlaying((prevIsPlaying) => {
          const newIsPlaying = [...prevIsPlaying];
          newIsPlaying[index] = false;
          return newIsPlaying;
        });
        setPrevChangeImage(changedImage.name);
      } else if (isPlaying[index] && audioElement) {
        // If isPlaying is true, resume or start playing the audio
        const newVolume = volumes[index] / 100;
        audioElement.volume = newVolume;

        if (newVolume > 0) {
          audioElement.play().catch((error) => {
            console.error("Error playing audio:", error);
          });
        }
      } else {
        // Pause and reset the audio when isPlaying is false
        if (audioElement) {
          audioElement.pause();
          audioElement.currentTime = 0; // Reset the audio to the beginning
          audioElement.volume = 0;
        }
      }

      // Other logic for handling volume changes and updates

      // console.log(audioElement.volume);
    });
  }, [isPlaying, volumes, audioRefs, changedImage, prevChangeImage]);

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
