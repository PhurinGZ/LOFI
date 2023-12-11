// this is router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Player from "./components/audioplayer/Player";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Player />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
