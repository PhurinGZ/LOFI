import { useState, useEffect, useRef } from "react";
import { styled, Slider, Paper, Stack, Box } from "@mui/material";

// #region ------------ ICONS ---------
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
// #endregion ------------ ICONS ---------

// #region ------- another -------------------------------------------------------
import sleepPlaylist from "../../data/songData";
import Time from "../time/Time";
import "./Player.scss";
// #endregion ---------------------------------------------------------------
const Playlist = sleepPlaylist;

export default function Player() {
  const audioPlayer = useRef();

  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [isVolumeHidden, setIsVolumeHidden] = useState(false);

  useEffect(() => {
    if (audioPlayer.current) {
      audioPlayer.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioPlayer.current) {
      audioPlayer.current.src = Playlist[index].src;
      if (isPlaying) {
        audioPlayer.current.play();
      } else {
        audioPlayer.current.pause();
      }
    }
  }, [index, isPlaying]);

  useEffect(() => {
    if (audioPlayer.current) {
      audioPlayer.current.addEventListener("ended", handleAudioEnded);
      return () => {
        audioPlayer.current.removeEventListener("ended", handleAudioEnded);
      };
    }
  }, [index, isPlaying]);

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

  const VolumeBtns = ({ onClick }) => {
    return volume === 0 ? (
      <VolumeOffIcon
        fontSize={"large"}
        sx={{
          color: "#FFF",
          "&:hover": {
            opacity: 1,
            transform: "scale(1.2)", // Increase the size on hover
          },
        }}
        onClick={onClick}
      />
    ) : volume <= 20 ? (
      <VolumeMuteIcon
        fontSize={"large"}
        sx={{
          color: "#FFF",
          "&:hover": {
            opacity: 1,
            transform: "scale(1.2)", // Increase the size on hover
          },
        }}
        onClick={onClick}
      />
    ) : volume <= 75 ? (
      <VolumeDownIcon
        fontSize={"large"}
        sx={{
          color: "#FFF",
          "&:hover": {
            opacity: 1,
            transform: "scale(1.2)", // Increase the size on hover
          },
        }}
        onClick={onClick}
      />
    ) : (
      <VolumeUpIcon
        fontSize={"large"}
        sx={{
          color: "#FFF",
          "&:hover": {
            opacity: 1,
            transform: "scale(1.2)", // Increase the size on hover
          },
        }}
        onClick={onClick}
      />
    );
  };

  return (
    <div className="borderBG-audio">
      <div>
        <audio src={Playlist[index].src} ref={audioPlayer} />
      </div>
      {/* เวลา */}
      <div className="time">
        <Time />
      </div>
      {/* เส้นแนวตั่ง */}
      <div className="line"></div>
      {/* audio-play */}
      <div className="audio-player">
        <SkipPreviousIcon
          fontSize={"large"}
          sx={{
            color: "#FFF",
            "&:hover": { transform: "scale(1.2)" },
          }}
          onClick={toggleSkipBackward}
        />
        {!isPlaying ? (
          <PlayArrowIcon
            fontSize={"large"}
            sx={{
              color: "#FFF",
              "&:hover": { transform: "scale(1.2)" },
            }}
            onClick={togglePlay}
          />
        ) : (
          <PauseIcon
            fontSize={"large"}
            sx={{
              color: "#FFF",
              "&:hover": { transform: "scale(1.2)" },
            }}
            onClick={togglePlay}
          />
        )}
        <SkipNextIcon
          fontSize={"large"}
          sx={{
            color: "#FFF",
            "&:hover": { transform: "scale(1.2)" },
          }}
          onClick={toggleSkipForward}
        />
        {/* volume */}

        <VolumeBtns onClick={handleLabelClick} />
        {isVolumeHidden && (
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
          />
        )}
      </div>

      {/* เส้นแนวตั่ง */}
      <div className="line"></div>
      <div className="namemusic">
        <p style={{ color: "#FFF" }}>ชื่อเพลง: {sleepPlaylist[index].name}</p>
      </div>
    </div>
  );
}
