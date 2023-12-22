import Demo from "../audioplayer/Demo";
import "./Home.scss";
import Header from "../../layout/header/head";
import { path } from "../../data/songData";
import Sidebar from "../../layout/sideBar/sidebar";

function Home() {
  return (
    <div className="main">
      <Header />
      <div>
        <Sidebar />
      </div>
      <div className="audioplayer">
        <Demo />
      </div>
      <video src={path[0].src} autoPlay loop muted />
    </div>
  );
}

export default Home;
