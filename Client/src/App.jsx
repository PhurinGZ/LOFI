// this is router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Player from "./components/audioplayer/Player";
import Demo from "./components/audioplayer/Demo";


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Player />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
