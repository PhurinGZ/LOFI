// Home.jsx
import Demo from "../audioplayer/Demo";
import "./Home.scss";
import Header from "../../layout/header/head";
import { path,chil,jazz,relax,sleep,work } from "../../data/songData";
import Sidebar from "../../layout/sideBar/sidebar";
import { useState,useEffect } from "react";
import { useMode } from "../../layout/catagory/modeContext";

function Home() {
  const { mode } = useMode(); // Destructure `mode` instead of `cat`
  const [selectedMode, setSelectedMode] = useState(chil);

  useEffect(() => {
    // console.log("Mode changed:", mode);
    if (mode === "chill") {
      setSelectedMode(chil);
    } else if (mode === "jazz") {
      setSelectedMode(jazz);
    } else if (mode === "relax") {
      setSelectedMode(relax);
    } else if (mode === "sleep") {
      setSelectedMode(sleep);
    } else if (mode === "work") {
      setSelectedMode(work);
    } else {
      setSelectedMode(chil);
    }
  }, [mode]);

  console.log(mode);

  return (
    <div className="main">
      <Header />
      <div>
        <Sidebar />
      </div>
      <video src={path[0].src} autoPlay loop muted />
      <div className="content">
      <span className="audioplayer">
          <Demo mode={selectedMode}/>
        </span>
      </div>
      <video src={path[0].src} autoPlay loop muted />
    </div>
  );
}

export default Home;
