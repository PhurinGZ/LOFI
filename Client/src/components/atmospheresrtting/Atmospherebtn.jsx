import React, { useRef, useState, useEffect } from "react";
import "./styles.scss";
import Slider from "@mui/material/Slider";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import { Button } from "@mui/material";
import Draggable from "react-draggable";

const thumbStyle = {
  width: 45,
  height: 45,
  borderRadius: "50%",
  cursor: "pointer",
  position: "relative",
  backgroundColor: "rgba(169, 169, 169, 0.8)",
  backgroundClip: "content-box",
  backgroundOrigin: "content-box",
  "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
    boxShadow: "inherit",
  },
  "&::before": {
    content: "''",
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    backgroundSize: "60%",
    backgroundPosition: "center",
    backgroundImage: "url(/public/assets/icons/rain.svg)",
    backgroundRepeat: "no-repeat",
  },
};

const CustomSlider = styled(Slider)`
  && {
    color: ${(props) => (props.volume === 0 ? "#808080" : "#BB98FF")};
    margin-left: 10px;
    margin-right: 10px;
    width: 130px;
    height: 25px;
    padding: 10px;
    & .MuiSlider-thumb {
      ${thumbStyle}
      background-color: ${(props) =>
        props.volume === 0 ? "#808080" : "rgba(187, 152, 255, 1)"};
    }
    & .MuiSlider-track {
      background-color: rgba(187, 152, 255, 1);
      border: none;
    }
    &:hover .MuiSlider-thumb {
      background-color: ${(props) =>
        props.volume === 0 ? "#808080" : "rgba(187, 152, 255, 1)"};
    }
  }
`;

function Atmospherebtn() {
  const audioRain = useRef(null);
  const [volume, setVolume] = useState(0);
  const [natureVolume, setNatureVolume] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAtmospheresetting, setIsAtmospheresetting] = useState(false);

  useEffect(() => {
    const audioElement = audioRain.current;

    if (isPlaying && audioElement) {
      audioElement.play();
    } else if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 1;
    }
  }, [isPlaying]);

  //-------------------------------------------------------------------------------------------------------city
  useEffect(() => {
    if (audioRain.current) {
      audioRain.current.volume = volume / 100;
    }
  }, [volume]);
  //-------------------------------------------------------------------------------------------------------nature
  useEffect(() => {
    if (audioRain.current) {
      audioRain.current.volume = natureVolume / 100;
    }
  }, [natureVolume]);
  //-------------------------------------------------------------------------------------------------------city
  const handleSliderChange = (event, newValue) => {
    if (audioRain.current) {
      setVolume(newValue);
      setIsPlaying(true);
    }
  };

  const handleNatureSliderChange = (event, newValue) => {
    if (audioRain.current) {
      setNatureVolume(newValue);
      setIsPlaying(true);
    }
  };

  const hahdleBtnClickAtmosphere = () => {
    setIsAtmospheresetting(!isAtmospheresetting);
  };

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
              <span> Atmosphere setting </span>{" "}
              <i onClick={hahdleBtnClickAtmosphere}>X</i>{" "}
            </div>
            <div className="city-atmos">
              <p> City</p>
              <div className="content-city">
                <h1> rain : </h1>
                <div className="volumeRain">
                  <div>
                    <audio
                      ref={audioRain}
                      src="/public/assets/soundatmosphere/rain.mp3"
                    />
                  </div>
                  <CustomSlider
                    volume={volume}
                    value={volume}
                    onChange={handleSliderChange}
                    disableRipple
                  />
                </div>
              </div>
            </div>
            {/* ------------------------------------------------------------------------------------------------natuer */}
            <div className="nature-atmos">
              <h1> Nature </h1>
              <div className="content-city">
                <h1> rain : </h1>
                <div className="volumeRain">
                  <div>
                    <audio
                      ref={audioRain}
                      src="/public/assets/soundatmosphere/rain.mp3"
                    />
                  </div>
                  <CustomSlider
                    volume={natureVolume}
                    value={natureVolume}
                    onChange={handleNatureSliderChange}
                    disableRipple
                  />
                </div>
              </div>
            </div>
          </div>
        </Draggable>
      )}
    </div>
  );
}

export default Atmospherebtn;
