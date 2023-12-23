import React, { useEffect, useRef, useState } from 'react';
import sleepPlaylist from '../../data/songData';
import './Player.scss';
import Time from '../time/Time';
import { IoPlayCircleOutline } from "react-icons/io5";
import { CgPlayPauseO } from "react-icons/cg";
import { TbPlayerSkipBackFilled, TbPlayerSkipForwardFilled } from "react-icons/tb";
import { FaVolumeLow } from "react-icons/fa6";

function Player() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volumeValue, setVolumeValue] = useState(50);
  const [isVolumeHidden, setIsVolumeHidden] = useState(true);

  const playNextSong = () => {
    setCurrentSongIndex((currentSongIndex + 1) % sleepPlaylist.length);
  };

  const playPreviousSong = () => {
    const prevIndex = (currentSongIndex - 1 + sleepPlaylist.length) % sleepPlaylist.length;
    setCurrentSongIndex(prevIndex);
  };

  const togglePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const audioElement = useRef(new Audio());
  const [isInitialSetup, setIsInitialSetup] = useState(true);

  useEffect(() => {
    const audio = audioElement.current;

    const handleEnded = () => {
      audio.currentTime = 0;
      playNextSong();
    };

    const handleCanPlayThrough = () => {
      if (isPlaying && !isInitialSetup) {
        audio.play().catch((error) => {
          console.error('Play Error:', error);
        });
      }
    };

    const handleVolumeChange = () => {
      if (isPlaying) {
        audio.volume = volumeValue / 100;
      }
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('canplaythrough', handleCanPlayThrough);
    audio.addEventListener('volumechange', handleVolumeChange);

    if (isPlaying) {
      if (
        audio.src !== sleepPlaylist[currentSongIndex].src ||
        audio.volume !== volumeValue / 100
      ) {
        audio.src = sleepPlaylist[currentSongIndex].src;
        audio.volume = volumeValue / 100;
        setIsInitialSetup(false);
      }
    }

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
      audio.removeEventListener('volumechange', handleVolumeChange);
      audio.pause();
    };
  }, [isPlaying, currentSongIndex, volumeValue, isInitialSetup]);

  const handleVolumeChange = (event) => {
    const newVolumeValue = event.target.value;
    setVolumeValue(newVolumeValue);
  };

  useEffect(() => {
    if (isPlaying) {
      audioElement.current.volume = volumeValue / 100;
    }
  }, [volumeValue, isPlaying]);

  const handleLabelClick = () => {
    setIsVolumeHidden(!isVolumeHidden);
    setTimeout(() => {
      setIsVolumeHidden(true);
    }, 15000); // 15,000 milliseconds
  };

  return (
    <div className="audio-main">
      <div className="borderBG-audio">
        <div>
          <audio
            loop
            ref={audioElement}
            src={sleepPlaylist[currentSongIndex].src}
            controls={false}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={playNextSong}
          />
        </div>
        {/* เวลา */}
        <div className="time"> <Time /> </div>
        {/* เส้นแนวตั่ง */}
        <div className="line"></div>
        {/* audio-play */}
        <div className="audio-player">
          <button className="btn-skrip" onClick={playPreviousSong}>
            <i className="icon" style={{ width: '25px' }}> <TbPlayerSkipBackFilled /> </i>
          </button>
          <button className="btn-play" onClick={togglePlayPause}>
            {isPlaying ? (
              <i className="icon"> <CgPlayPauseO /> </i>
            ) : (
              <i className='icon'> <IoPlayCircleOutline /> </i>
            )}
          </button>
          <button className="btn-skrip" onClick={playNextSong}>
            <i className="icon" style={{ width: '25px' }}> <TbPlayerSkipForwardFilled /> </i>
          </button>
        </div>
        {/* volume */}
        <div className='custom-volume'>
          <button className='btn-play' htmlFor="volume" onClick={handleLabelClick}>
            <i className="icon" style={{ width: '20px' }} > <FaVolumeLow /> </i>
          </button>
          {!isVolumeHidden && (
            <input
              type="range"
              id="volume"
              name="volume"
              min="0"
              max="100"
              value={volumeValue}
              onChange={handleVolumeChange}
              className="custom-range"
            />
          )}
        </div>
        {/* เส้นแนวตั่ง */}
        <div className="line"></div>
        {/* ชื่อเพลง */}
        <div className="namemusic">
          <p>ชื่อเพลง: {sleepPlaylist[currentSongIndex].name}</p>
        </div>
      </div>
    </div>
  );
}

export default Player;
