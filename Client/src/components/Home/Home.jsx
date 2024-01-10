// Home.jsx
import Demo from "../audioplayer/Demo";
import "./Home.scss";
import Header from "../../layout/header/head";
import { Romantic, chil, Sad, happy, sexy } from "../../data/songData";
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
  const [isVisible, setIsVisble] = useState(true);

  const { mode } = useMode();
  const [selectedMode, setSelectedMode] = useState(chil);
  const { dayNight, atmosphere, changedImage } = useMode();
  const mergeMode = (dayNight || "day") + "-" + atmosphere;

  // console.log(changedImage);
  // console.log(typeLofi[0].video[4])

  const handleVideoPaths = (imageData) => {
    if (Array.isArray(imageData?.data)) {
      imageData.data.forEach((pathLofi) => {
        if (pathLofi.mode === dayNight || pathLofi.mode === mergeMode) {
          switch (pathLofi.mode) {
            case "day":
              if (mergeMode !== `${dayNight}-rain`) {
                setNextVideoOpacity(0);
                setCurrentVideoOpacity(1);
                setCurrentPath(pathLofi.src);
              }
              break;
            case "night":
              if (mergeMode !== `${dayNight}-rain`) {
                setNextVideoOpacity(1);
                setCurrentVideoOpacity(0);
                setNextPath(pathLofi.src);
              }
              break;
            case "day-rain":
              if (currentPath) {
                setNextVideoOpacity(1);
                setCurrentVideoOpacity(0);
                setNextPath(pathLofi.src);
                console.log("next day-rain");
              } else {
                setNextVideoOpacity(0);
                setCurrentVideoOpacity(1);
                setCurrentPath(pathLofi.src);
                console.log("current day-rain");
              }
              break;
            case "night-rain":
              if (nextPath) {
                setNextVideoOpacity(0);
                setCurrentVideoOpacity(1);
                setCurrentPath(pathLofi.src);
                console.log("current night-rain");
              } else {
                setNextVideoOpacity(1);
                setCurrentVideoOpacity(0);
                setNextPath(pathLofi.src);
                console.log("next night-rain");
              }
              break;
            default:
              break;
          }
        }
      });
    }
  };

  const handleVideoPathsReality = (imageData) => {
    if (Array.isArray(imageData?.data)) {
      imageData.data.forEach((pathLofi) => {
        // console.log(pathLofi);
        if (currentPath !== pathLofi.src) {
          setNextVideoOpacity(0);
          setCurrentVideoOpacity(1);
          setCurrentPath(pathLofi.src);
          // console.log("currentPath !== pathLofi.src");
          if (nextPath !== pathLofi.src) {
            setNextVideoOpacity(1);
            setCurrentVideoOpacity(0);
            setNextPath(pathLofi.src);
            // console.log("nextPath !== pathLofi.src");
          } else {
            setNextVideoOpacity(1);
            setCurrentVideoOpacity(0);
            // console.log("else");
          }
        } else {
          setNextVideoOpacity(0);
          setCurrentVideoOpacity(1);
        }
      });
    }
  };

  useEffect(() => {
    if (changedImage.name === "reality") {
      setIsVisble(false);
    } else {
      setIsVisble(true);
    }

    // console.log(changedImage.pIcon);
  });

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
        handleVideoPaths(changedImage);
        // console.log(
        //   "lofi1",
        //   changedImage.data.find((item) => item.mode === dayNight)?.src || ""
        // );
      } else if (changedImage.name === "lofi2" && changedImage.data) {
        handleVideoPaths(changedImage);
        // console.log(
        //   "lofi2",
        //   changedImage.data.find((item) => item.mode === dayNight)?.src || ""
        // );
      } else if (changedImage.name === "lofi3" && changedImage.data) {
        handleVideoPaths(changedImage);
        // console.log(
        //   "lofi3",
        //   changedImage.data.find((item) => item.mode === dayNight)?.src || ""
        // );
      } else if (changedImage.name === "lofi4" && changedImage.data) {
        handleVideoPaths(changedImage);
        // console.log(
        //   "lofi4",
        //   changedImage.data.find((item) => item.mode === dayNight)?.src || ""
        // );
      } else if (changedImage.name === "lofi5" && changedImage.data) {
        handleVideoPaths(changedImage);
        // console.log(
        //   "lofi5",
        //   changedImage.data.find((item) => item.mode === dayNight)?.src || ""
        // );
      } else if (changedImage.name === "reality" && changedImage.data) {
        handleVideoPathsReality(changedImage);
        // console.log(
        //   "reality",
        //   changedImage.data.find((item) => item.mode === dayNight)?.src || ""
        // );
      }
    }

    if (nextPath) {
      setIsNextPath(true);
    }
  }, [dayNight, atmosphere, changedImage?.data]);

  return (
    <div className="main">
      <div className="fh relative">
        <Header />
        <div
          className="background-video video-player"
          style={{ opacity: currentVideoOpacity }}
        >
          <video className="videofirst" src={currentPath} autoPlay loop muted />
        </div>

        <div
          className="background-video video-player"
          style={{ opacity: nextVideoOpacity }}
        >
          <video className="videosecond" src={nextPath} autoPlay loop muted />
        </div>

        <div>
          <Sidebar />
        </div>

        {isVisible &&
          changedImage.pIcon &&
          changedImage.pIcon.map((p) => (
            <div
              className="btn-rain"
              style={{
                position: "absolute",
                top: `${p.position[0]}%`,
                left: `${p.position[1]}%`,
                right: `${p.position[2]}%`,
              }}
              key={p.id}
            >
              {/* {console.log(p)} */}

              {changedImage.name !== "reality" && (
                <AtmosphereButton name={p.name} />
              )}
            </div>
          ))}
      </div>
      <span className="audioplayer">
        <Demo mode={selectedMode} />
      </span>

      <div className="modeName">
        <p>Mode - {selectedMode[0].mode}</p>
      </div>
    </div>
  );
};

export default Home;
