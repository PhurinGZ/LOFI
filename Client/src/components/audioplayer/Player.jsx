import React, { useEffect, useRef, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import sleepPlaylist from '../../data/songData';

function Player() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volumeValue, setVolumeValue] = useState(50);

  const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % sleepPlaylist.length;
    setCurrentSongIndex(nextIndex);
  };

  const playPreviousSong = () => {
    const prevIndex = (currentSongIndex - 1 + sleepPlaylist.length) % sleepPlaylist.length;
    setCurrentSongIndex(prevIndex);
  };

  const togglePlayPause = () => {
    const isPlayingNow = isPlaying;
    setIsPlaying(!isPlayingNow);
  };

  const audioElement = useRef(new Audio());
  useEffect(() => {
    const audio = audioElement.current;
  
    const handleEnded = () => {
      // เรียกฟังก์ชันเล่นเพลงถัดไป
      playNextSong();
    };
  
    if (isPlaying) {
      // เพิ่ม Event Listener สำหรับเหตุการณ์เพลงจบ
      audio.addEventListener('ended', handleEnded);
  
      // แก้ปัญหาการที่ต้องกดหยุดหลายครั้งเพื่อหยุด
      audio.pause();
      audio.currentTime = 0;
  
      // ตั้งค่า URL เพลงและปรับระดับเสียง
      audio.src = sleepPlaylist[currentSongIndex].src;
      audio.volume = volumeValue / 100;
  
      // เริ่มเล่นเพลง
      const playPromise = audio.play();
  
      if (playPromise) {
        playPromise
          .then(() => {})
          .catch(error => {
            console.error('Play Error:', error);
          });
      }
    } else {
      // หยุดเล่นเพลง
      audio.pause();
      audio.removeEventListener('ended', handleEnded);
    }
  
    // Cleanup Function
    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isPlaying, currentSongIndex, volumeValue]);
  

  return (
    <div>
      <div>
        <ReactAudioPlayer
          src={sleepPlaylist[currentSongIndex].src}
          autoPlay={isPlaying}
          controls={(false)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={playNextSong}
        />

        <p>{isPlaying ? 'กำลังเล่น' : 'หยุด'}</p>
        <p>ชื่อเพลง: {sleepPlaylist[currentSongIndex].name}</p>
      </div>
      <div>
        <button onClick={playPreviousSong}>
          พลงก่อนหน้านี้
        </button>
        <button onClick={togglePlayPause}>{isPlaying ? 'หยุด' : 'เล่น'}</button>
        <button onClick={playNextSong}>เพลงถัดไป</button>
      </div>
    </div>
  );
}

export default Player;
