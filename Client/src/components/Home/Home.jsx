import Demo from "../audioplayer/Demo";
import "./Home.scss";
import Header from "../../layout/header/head";
import { Romantic, chil, Sad, happy, sexy } from "../../data/songData";
import Sidebar from "../../layout/sideBar/sidebar";
import { useState, useEffect, useMemo } from "react";
import { useMode } from "../../context/modeContext";
import AtmosphereButton from "../atmosphereIcons/atmosphere";
import { Link, useLocation } from "react-router-dom";
import Register from "../membership/register";
import Login from "../membership/Login";
import { useAuth } from "../../context/authContext";
import Profile from "../profile/profile";

const useQuery = () => {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
};

const Home = () => {
  let query = useQuery();
  const [queryUrl, setQueryUrl] = useState();
  const [currentVideoOpacity, setCurrentVideoOpacity] = useState(1);
  const [nextVideoOpacity, setNextVideoOpacity] = useState(0);
  const [nextPath, setNextPath] = useState("");
  const [currentPath, setCurrentPath] = useState("");
  const [isNextPath, setIsNextPath] = useState(false);
  const [isVisible, setIsVisble] = useState(true);
  const [prevChangeImage, setPrevChangeImage] = useState("");

  const token = localStorage.getItem("token");

  const { setPath, logout } = useAuth();

  // console.log("user : ",user)

  // membership
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const { mode, dayNight, atmosphere, changedImage, setAtmosphere } = useMode();
  const [selectedMode, setSelectedMode] = useState(chil);
  const mergeMode = (dayNight || "day") + "-" + atmosphere;

  useEffect(() => {
    if (query.get("auth")) {
      setQueryUrl(query.get("auth"));
      setModalOpen(true);
    } else {
      setModalOpen(false);
      setQueryUrl("");
    }
  });
  console.log(queryUrl);

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
              } else {
                setNextVideoOpacity(0);
                setCurrentVideoOpacity(1);
                setCurrentPath(pathLofi.src);
              }
              break;
            case "night-rain":
              if (nextPath) {
                setNextVideoOpacity(0);
                setCurrentVideoOpacity(1);
                setCurrentPath(pathLofi.src);
              } else {
                setNextVideoOpacity(1);
                setCurrentVideoOpacity(0);
                setNextPath(pathLofi.src);
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
        if (currentPath !== pathLofi.src) {
          setCurrentVideoOpacity(1);
          setCurrentPath(pathLofi.src);
          setNextVideoOpacity(0);
          if (nextPath !== pathLofi.src) {
            setNextVideoOpacity(1);
            setCurrentVideoOpacity(0);
            setNextPath(pathLofi.src);
          } else {
            setNextVideoOpacity(1);
            setCurrentVideoOpacity(0);
          }
        } else {
          setNextVideoOpacity(0);
          setCurrentVideoOpacity(1);
        }
      });
    }
  };

  useEffect(() => {
    if (prevChangeImage !== changedImage.name) {
      setAtmosphere("");
      setPrevChangeImage(changedImage.name);
    }
  });

  useEffect(() => {
    setIsVisble(changedImage.name !== "reality");
  });

  useEffect(() => {
    const modesMap = { chill: chil, romantic: Romantic, sad: Sad, sexy, happy };
    setSelectedMode(modesMap[mode] || chil);
  }, [mode]);

  useEffect(() => {
    if (changedImage && changedImage.name) {
      if (changedImage.name.includes("lofi") && changedImage.data) {
        handleVideoPaths(changedImage);
      } else if (changedImage.name === "reality" && changedImage.data) {
        handleVideoPathsReality(changedImage);
      }
    }

    if (nextPath) {
      setIsNextPath(true);
    }
  }, [dayNight, atmosphere, changedImage?.data]);

  const handleLogout = () => {
    logout();
    setPath("/?auth=register")
  };

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
                width: "fit-content",
                height: "fit-content",
              }}
              key={p.id}
            >
              {changedImage.name !== "reality" && (
                <AtmosphereButton name={p.name} />
              )}
            </div>
          ))}
      </div>
      {token && queryUrl === "profile" && (
        <Profile handleLogout={handleLogout}/>
      )}

      {!token && queryUrl === "register" ? (
        <div className="membership">
          <Register isModalOpen={isModalOpen} />
        </div>
      ) : !token && queryUrl === "login" ? (
        <div className="membership">
          <Login isModalOpen={isModalOpen} />
        </div>
      ) : null}

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
