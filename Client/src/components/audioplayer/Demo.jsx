//demo.jsx
import { useState, useEffect, useRef } from "react";
import { Slider } from "@mui/material";

// #region ------------ ICONS ---------
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
// #endregion ------------ ICONS ---------

// #region ------- another -------------------------------------------------------
import Time from "../time/Time";
import "./player.scss";
// #endregion ---------------------------------------------------------------

const Demo = ({ mode }) => {
  const audioPlayer = useRef(new Audio());

  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [isVolumeHidden, setIsVolumeHidden] = useState(true);

  const Playlist = mode;
  // console.log("In demo" + Playlist);

  useEffect(() => {
    if (audioPlayer.current) {
      audioPlayer.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioPlayer.current) {
      audioPlayer.current.src = Playlist[index].src;
      audioPlayer.current.load();
  
      if (isPlaying) {
        audioPlayer.current.play();
      } else {
        audioPlayer.current.pause();
      }
    }
  }, [index, isPlaying, mode]);
  

  useEffect(() => {
    if (audioPlayer.current) {
      audioPlayer.current.addEventListener("ended", handleAudioEnded);
      return () => {
        audioPlayer.current.removeEventListener("ended", handleAudioEnded);
      };
    }
  }, [index, isPlaying, mode]);

  const handleAudioEnded = () => {
    setIndex((prevIndex) => (prevIndex + 1) % Playlist.length);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!isPlaying) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
    }
    setIsPlaying((prev) => !prev);
  };

  const toggleSkipForward = () => {
    setIndex((prev) => (prev + 1) % Playlist.length);
  };

  const toggleSkipBackward = () => {
    setIndex((prev) => (prev - 1 + Playlist.length) % Playlist.length);
  };

  const handleLabelClick = () => {
    setIsVolumeHidden(!isVolumeHidden);
    setTimeout(() => {
      setIsVolumeHidden(true);
    }, 15000); // 15,000 milliseconds
  };
  // console.log("isVolumeHidden",isVolumeHidden)
  const VolumeBtns = ({ onClick }) => {
    return volume === 0 ? (
      <VolumeOffIcon
        fontSize={"large"}
        sx={{
          color: "#FFF",
          "&:hover": {
            opacity: 1,
            transform: "scale(1.2)",
            cursor:"pointer",
          },
        }}
        onClick={onClick}
        className="volume-size"
      />
    ) : volume <= 20 ? (
      <VolumeMuteIcon
        fontSize={"large"}
        sx={{
          color: "#FFF",
          "&:hover": {
            opacity: 1,
            transform: "scale(1.2)",
            cursor:"pointer",
          },
        }}
        onClick={onClick}
        className="volume-size"
      />
    ) : volume <= 75 ? (
      <VolumeDownIcon
        fontSize={"large"}
        sx={{
          color: "#FFF",
          "&:hover": {
            opacity: 1,
            transform: "scale(1.2)",
            cursor:"pointer",
          },
        }}
        onClick={onClick}
        className="volume-size"
      />
    ) : (
      <VolumeUpIcon
        fontSize={"large"}
        sx={{
          color: "#FFF",
          "&:hover": {
            opacity: 1,
            transform: "scale(1.2)",
            cursor:"pointer",
          },
        }}
        onClick={onClick}
        className="volume-size"
      />
    );
  };

  return (
    <div className="audio-main">
      <div className="borderBG-audio">
        <div>
          {/* <audio src={Playlist[index].src} ref={audioPlayer}  /> */}
        </div>
        {/* เวลา -----------------------------------------------------------------------------------------------------เวลา */}
        <div className="time">
          <Time />
        </div>
        {/* เส้นแนวตั่ง -----------------------------------------------------------------------------------------------------เส้นแนวตั่ง */}
        <div className="line"></div>
        {/* audio-play ----------------------------------------------------------------------------------------------------- audio-play*/}
        <div className="audio-player">
          <SkipPreviousIcon
            fontSize={"large"}
            sx={{
              color: "#FFF",
              "&:hover": { transform: "scale(1.2)",cursor:"pointer", },
            }}
            onClick={toggleSkipBackward}
          />
          {!isPlaying ? (
            <PlayCircleOutlineIcon
              fontSize={"large"}
              sx={{
                color: "#FFF",
                "&:hover": { transform: "scale(1.2)",cursor:"pointer", },
              }}
              onClick={togglePlay}
            />
          ) : (
            <PauseCircleOutlineIcon
              fontSize={"large"}
              sx={{
                color: "#FFF",
                "&:hover": { transform: "scale(1.2)", cursor:"pointer", },
              }}
              onClick={togglePlay}
            />
          )}
          <SkipNextIcon
            fontSize={"large"}
            sx={{
              color: "#FFF",
              "&:hover": { transform: "scale(1.2)",cursor:"pointer", },
            }}
            onClick={toggleSkipForward}
          />
          {/* volume -----------------------------------------------------------------------------------------------------volume */}
          <div className="costom-volume">
            <VolumeBtns onClick={handleLabelClick} />
            {!isVolumeHidden && (
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
            )}
          </div>
        </div>
        {/* เส้นแนวตั่ง-----------------------------------------------------------------------------------------------------เส้นแนวตั่ง */}
        <div className="line"></div>
        <div className="namemusic">
          <p style={{ color: "#FFF" }}>
            <strong> Music :</strong>{" "}
            {Playlist[index].name.length <= 12
              ? Playlist[index].name
              : Playlist[index].name.substr(0, 12) + "..."}{" "}
            &nbsp; &nbsp; <strong> By : </strong>{" "}
            {Playlist[index].music_by.length <= 9
              ? Playlist[index].music_by
              : Playlist[index].music_by.substr(0, 9) + "..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Demo;
