// this is router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Demo from "./components/audioplayer/Demo";
import Home from "./components/Home/Home";
import Header from "./layout/header/head";
import Cat from "./layout/catagory/catagory";
import Sidebar from "./layout/sideBar/sidebar";
import { ModeProvider } from "./context/modeContext";
import { AtmosphereProvider } from "./context/atmosphere";
import VerifyEmail from "./page/verifyEmail";
import Register from "./components/membership/register";
import Login from "./components/membership/Login";

function App() {
  return (
    <BrowserRouter>
      <ModeProvider>
        <AtmosphereProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/category" element={<Cat />} />
            <Route path="/sidebar" element={<Sidebar />} />
            <Route
              path="/verify-email/:emailToken"
              element={<VerifyEmail />}
            ></Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AtmosphereProvider>
      </ModeProvider>
    </BrowserRouter>
  );
}

export default App;
