import { SpeedInsights } from "@vercel/speed-insights/react";
import Demo from "../audioplayer/Demo";
import "./Home.scss";
import Header from "../../layout/header/head";
import { path } from "../../data/songData";
import Sidebar from "../../layout/sideBar/sidebar";

function Home() {
  return (
    <div className="main">
      <Header />
      <div style={{position:"relative", top:"150px"}}>
        <Sidebar />
      </div>
      <video src={path[0].src} autoPlay loop muted />
      <div className="content">
        <div className="audioplayer">
          <Demo />
        </div>
      </div>
      <SpeedInsights />
    </div>
  );
}

export default Home;
