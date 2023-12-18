import Demo from "../audioplayer/Demo";
import "./Home.scss";

function Home() {
  return (
    <div className="main">
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
