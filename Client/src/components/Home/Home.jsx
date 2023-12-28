import Demo from "../audioplayer/Demo";
import "./Home.scss";
import Header from "../../layout/header/head";
import { Romantic, chil, Sad, happy, sexy } from "../../data/songData";
import { pathLofi1, pathLofi2 } from "../../data/videoBackgroundData";
import Sidebar from "../../layout/sideBar/sidebar";
import { useState, useEffect } from "react";
import { useMode } from "../../context/modeContext";
import AtmosphereButton from "../atmosphereIcons/atmosphere";
import { typeLofi } from "../../data/chooseVideo";

const Home = () => {
  const [currentVideoOpacity, setCurrentVideoOpacity] = useState(1);
  const [nextVideoOpacity, setNextVideoOpacity] = useState(0);
  const [nextPath, setNextPath] = useState("");
  const [currentPath, setCurrentPath] = useState("");
  const [isNextPath, setIsNextPath] = useState(false);

  const { mode } = useMode();
  const [selectedMode, setSelectedMode] = useState(chil);
  const { dayNight, atmosphere, changedImage } = useMode();
  const mergeMode = (dayNight || "day") + "-" + atmosphere;

  // console.log(changedImage.data);
  // changedImage.map((m) =>{
  //   console.log("m : ",m)
  //   if(dayNight === m.mode){
  //     console.log("type Lofi", m.mode );
  //   }
  // })
  // console.log(changedImage.data)

  useEffect(() => {
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
    if (changedImage && changedImage.name) {
      if (changedImage.name === "lofi1" && changedImage.data) {
        if (Array.isArray(changedImage?.data)) {
          changedImage.data.forEach((pathLofi) => {
            if (pathLofi.mode === dayNight || pathLofi.mode === mergeMode) {
              switch (pathLofi.mode) {
                case "day":
                  setNextVideoOpacity(0);
                  setCurrentVideoOpacity(1);
                  setCurrentPath(pathLofi.src);
                  console.log("day", pathLofi.mode);
                  break;
                case "night":
                  setNextVideoOpacity(1);
                  setCurrentVideoOpacity(0);
                  setNextPath(pathLofi.src);
                  console.log("night", pathLofi.mode);
                  break;
                case "day-rain":
                  setNextVideoOpacity(0);
                  setCurrentVideoOpacity(1);
                  setCurrentPath(pathLofi.src);
                  console.log("day-rain", pathLofi.mode);
                  break;
                case "night-rain":
                  setNextVideoOpacity(1);
                  setCurrentVideoOpacity(0);
                  setNextPath(pathLofi.src);
                  console.log("night-rain", pathLofi.mode);
                  break;
                default:
                  break;
              }
            }
          });
        }
        console.log(
          "lofi1",
          changedImage.data.find((item) => item.mode === dayNight)?.src || ""
        );
      } else if (changedImage.name === "lofi2" && changedImage.data) {
        if (Array.isArray(changedImage?.data)) {
          changedImage.data.forEach((pathLofi) => {
            if (pathLofi.mode === dayNight || pathLofi.mode === mergeMode) {
              switch (pathLofi.mode) {
                case "day":
                  setNextVideoOpacity(1);
                  setCurrentVideoOpacity(0);
                  setNextPath(pathLofi.src);
                  console.log("day", pathLofi.mode);
                  break;
                case "night":
                  setNextVideoOpacity(0);
                  setCurrentVideoOpacity(1);
                  setCurrentPath(pathLofi.src);
                  console.log("night", pathLofi.mode);
                  break;
                case "day-rain":
                  setNextVideoOpacity(1);
                  setCurrentVideoOpacity(0);
                  setNextPath(pathLofi.src);
                  console.log("day-rain", pathLofi.mode);
                  break;
                case "night-rain":
                  setNextVideoOpacity(0);
                  setCurrentVideoOpacity(1);
                  setCurrentPath(pathLofi.src);
                  console.log("night-rain", pathLofi.mode);
                  break;
                default:
                  break;
              }
            }
          });
        }
        console.log(
          "lofi2",
          changedImage.data.find((item) => item.mode === dayNight)?.src || ""
        );
      }
    }

    if (nextPath) {
      setIsNextPath(true);
    }
  }, [dayNight, atmosphere, changedImage?.data]);

  return (
    <div className="main">
      <Header />
      <div>
        <Sidebar />
      </div>
      <div className="btn-rain">
        <AtmosphereButton />
      </div>
      <span className="audioplayer">
        <Demo mode={selectedMode} />
      </span>
      <div className="modeName">
        <p>Mode - {selectedMode[0].mode}</p>
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
     
        <video
          className="videosecond"
          src={nextPath}
          autoPlay
          loop
          muted
          style={{ opacity: nextVideoOpacity }}
        />

    </div>
  );
};

export default Home;
