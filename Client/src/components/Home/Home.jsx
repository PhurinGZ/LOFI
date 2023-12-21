import { SpeedInsights } from '@vercel/speed-insights';
import Demo from "../audioplayer/Demo";
import "./Home.scss";
import Header from "../../layout/header/head";
import {path} from "../../data/songData"


function Home() {
  return (
    <div className="main">
      <Header />
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
