// Home.jsx
import Demo from "../audioplayer/Demo";
import "./Home.scss";
import Header from "../../layout/header/head";
import {
  Romantic,
  chil,
  Sad,
  happy,
  sexy,
  pathLofi1,
} from "../../data/songData";
import Sidebar from "../../layout/sideBar/sidebar";
import { useState, useEffect } from "react";
import { useMode } from "../../layout/catagory/modeContext";

function Home() {

  const [currentVideoOpacity, setCurrentVideoOpacity] = useState(1);
  const [nextVideoOpacity, setNextVideoOpacity] = useState(0);


  const { mode } = useMode(); // Destructure `mode` instead of `cat`
  const [selectedMode, setSelectedMode] = useState(chil);
  const { dayNight } = useMode()

  // console.log(selectedMode[0].mode)

  useEffect(() => {
    // console.log("Mode changed:", mode);
    if (mode === "chill") {
      setSelectedMode(chil);
    } else if (mode === "romantic") {
      setSelectedMode(Romantic);
    } else if (mode === "sad") {
      setSelectedMode(Sad);
    } else if (mode === "sexy") {
      setSelectedMode(sexy);
    } else if (mode === "Happy") {
      setSelectedMode(happy);
    } else {
      setSelectedMode(chil);
    }
  }, [mode]);

  useEffect(() => {
    // ตรวจสอบ dayNight และปรับ Opacity
    if (dayNight === "day") {
      setCurrentVideoOpacity(1);
      setNextVideoOpacity(0)
 
    } else if (dayNight === "night"){
      setNextVideoOpacity(1)
      setCurrentVideoOpacity(0);
    }
  }, [dayNight]);
  console.log("currentVideoOpacity", currentVideoOpacity)
  console.log("currentVideoOpacity", nextVideoOpacity)



  console.log(dayNight);

  return (
    <div className="main">
      <Header />
      <div>
        <Sidebar />
      </div>
      <span className="audioplayer">
        <Demo mode={selectedMode} />
      </span>
      <div className="modeName">
        <p>Music Mode - {selectedMode[0].mode}</p>
      </div>
      
      {/* {dayNight === "day" ? <video src={pathLofi1[0].src} autoPlay loop muted /> : (dayNight === "night" ? <video src={pathLofi1[1].src} autoPlay loop muted /> : <></>)} */}

      <video className="videofirst"
        src={pathLofi1[0].src}
        autoPlay
        loop
        muted
        style={{opacity:currentVideoOpacity}}
      />

      <video className="videosecond"
        src={pathLofi1[1].src}
        autoPlay
        loop
        muted
        style={{opacity:nextVideoOpacity}}
      />


    </div>
  );
}

export default Home;
