// this is router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Demo from "./components/audioplayer/Demo";
import Home from "./components/Home/Home";
import Header from "./layout/header/head";
import Cat from "./layout/catagory/catagory";
import Sidebar from "./layout/sideBar/sidebar";
import { ModeProvider } from "./context/modeContext";

function App() {
  return (
    <BrowserRouter>
      <ModeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/category" element={<Cat />} />
          <Route path="/sidebar" element={<Sidebar />} />
        </Routes>
      </ModeProvider>
    </BrowserRouter>
  );
}

export default App;
