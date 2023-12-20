import Demo from "../audioplayer/Demo";
import "./Home.scss";
import Header from "../../layout/header/head";

function Home() {
  return (
    <div className="main">
      <Header />
      <video src="../../../public/assets/video/video.mp4" autoPlay loop muted />
      <div className="content">
        <div className="audioplayer">
          <Demo />
        </div>
      </div>
    </div>
  );
}

export default Home;
