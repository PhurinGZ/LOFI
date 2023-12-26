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
  const [isCurrentPath, setIsCurrentPath] = useState(false);

  const { mode } = useMode();
  const [selectedMode, setSelectedMode] = useState(chil);
  const { dayNight, atmosphere } = useMode();
  const mergMode = dayNight + "-" + atmosphere;

  // console.log(selectedMode[0].mode)
  // console.log("Outside"+atmosphere);

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
    pathLofi1.map((pathLofi) => {
      // console.log("inner" + atmosphere);
  
      if (dayNight === pathLofi.mode || (atmosphere === "rain" && mergMode === pathLofi.mode)) {
        // console.log("currentPath" + currentPath);
        // console.log("nextPath" + nextPath);
        if (currentPath !== pathLofi.src) {
          setNextVideoOpacity(1);
          setCurrentVideoOpacity(0);
          setNextPath(pathLofi.src);
        } else if (nextPath !== pathLofi.src) {
          setNextVideoOpacity(0);
          setCurrentVideoOpacity(1);
          setCurrentPath(pathLofi.src);
        }
      }
    });
  
    if (currentPath === "") {
      pathLofi1.map((pathLofi) => {
        if (pathLofi.mode === "day") {
          setCurrentPath(pathLofi.src);
          console.log(pathLofi.src);
        }
      });
    }
  
    if (currentPath) {
      setIsCurrentPath(true);
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
      {isCurrentPath ? (
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
