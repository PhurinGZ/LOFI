// this is router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Demo from "./components/audioplayer/Demo";
import Home from "./components/Home/Home";
import Sidebar from "./layout/sideBar/sidebar";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/sidebar" element={<Sidebar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
