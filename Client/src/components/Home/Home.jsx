// Home.jsx
import Demo from "../audioplayer/Demo";
import "./Home.scss";
import Header from "../../layout/header/head";
import { Romantic, chil, Sad, happy, sexy } from "../../data/songData";
import { pathLofi1 } from "../../data/videoBackgroundData";
import Sidebar from "../../layout/sideBar/sidebar";
import { useState, useEffect } from "react";
import { useMode } from "../../context/modeContext";
import AtmosphereButton from "../atmosphereIcons/atmosphere";

function Home() {
  const [currentVideoOpacity, setCurrentVideoOpacity] = useState(1);
  const [nextVideoOpacity, setNextVideoOpacity] = useState(0);
  const [nextPath, setNextPath] = useState("");
  const [currentPath, setCurrentPath] = useState("");
  const [isNextPath, setisNextPath] = useState(false);

  const { mode } = useMode();
  const [selectedMode, setSelectedMode] = useState(chil);
  const { dayNight, atmosphere } = useMode();
  const mergMode = (dayNight || "day") + "-" + atmosphere;

  // console.log(selectedMode[0].mode)
  // console.log("Outside"+atmosphere);
  console.log("mergeMode src : " + mergMode);

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
    } else if (mode === "happy") {
      setSelectedMode(happy);
    } else {
      setSelectedMode(chil);
    }
  }, [mode]);

  useEffect(() => {
    const daySrc = pathLofi1.find((item) => item.mode === "day").src;

    // defualt day and day-rain
    if (currentPath === "") {
      setNextVideoOpacity(0);
      setCurrentVideoOpacity(1);
      setCurrentPath(daySrc);
      console.log("currentPath === ");
      console.log(daySrc);
    } else if (mergMode === "day-") {
      setNextVideoOpacity(0);
      setCurrentVideoOpacity(1);
    }

    pathLofi1.map((pathLofi) => {
      // console.log("inner" + atmosphere);
      if (
        dayNight === pathLofi.mode ||
        (atmosphere === "rain" && mergMode === pathLofi.mode)
      ) {
        console.log("--------------------------------");
        // console.log("currentPath" + currentPath);
        // console.log("nextPath" + nextPath);

        console.log("current src : " + pathLofi.mode);
        // console.log("mergeMode src : " + mergMode);

        if (pathLofi.mode === "day") {
          setNextVideoOpacity(0);
          setCurrentVideoOpacity(1);
          setCurrentPath(pathLofi.src);
        } else if (pathLofi.mode === "night") {
          setNextVideoOpacity(1);
          setCurrentVideoOpacity(0);
          setNextPath(pathLofi.src);
        } else if (pathLofi.mode === "day-rain") {
          setNextVideoOpacity(0);
          setCurrentVideoOpacity(1);
          setCurrentPath(pathLofi.src);
        } else if (pathLofi.mode === "night-rain") {
          setNextVideoOpacity(1);
          setCurrentVideoOpacity(0);
          setNextPath(pathLofi.src);
        }
      }
    });

    if (nextPath) {
      setisNextPath(true);
    }
  }, [dayNight, atmosphere]);
  // console.log("currentVideoOpacity", currentVideoOpacity);
  // console.log("currentVideoOpacity", nextVideoOpacity);

  // console.log(dayNight);

  return (
    <div className="main">
      <Header />
      <div>
        <Sidebar />
      </div>
      <span className="audioplayer">
        <div
          style={{
            position: "relative",
            top: "300px",
            zIndex: 2,
            left: "150px",
          }}
        >
          <AtmosphereButton />
        </div>
        <Demo mode={selectedMode} />
      </span>
      <div className="modeName">
        <p>Music Mode - {selectedMode[0].mode}</p>
      </div>

      {/* {dayNight === "day" ? <video src={pathLofi1[0].src} autoPlay loop muted /> : (dayNight === "night" ? <video src={pathLofi1[1].src} autoPlay loop muted /> : <></>)} */}

      <video
        className="videofirst"
        src={currentPath}
        autoPlay
        loop
        muted
        style={{ opacity: currentVideoOpacity }}
      />
      {isNextPath ? (
        <video
          className="videosecond"
          src={nextPath}
          autoPlay
          loop
          muted
          style={{ opacity: nextVideoOpacity }}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Home;
