// this is router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Demo from "./components/audioplayer/Demo";
import Home from "./components/Home/Home";
import Header from "./layout/header/head";
import Cat from "./components/catagory/catagory";


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/category" element={<Cat/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
