// this is router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cat from "./components/catagory/catagory";
import Home from "./components/Home/Home";
import Demo from "./components/audioplayer/Demo";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catagory" element={<Cat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
