// this is router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Demo from "./components/audioplayer/Demo";
import Home from "./components/Home/Home";
import Cat from "./layout/catagory/catagory";
import Sidebar from "./layout/sideBar/sidebar";
import { ModeProvider } from "./context/modeContext";
import { AtmosphereProvider } from "./context/atmosphere";
import VerifyEmail from "./page/verifyEmail";
import { AuthProvider } from "./context/authContext";
import ResetPassword from "./page/forgetPassword";
import MyEditor from "./components/note/note";
import ListNote from "./components/note/listNote";
import { NoteProvider } from "./context/noteContext";
import Displaycard from "./components/cardtarot/displaycard";

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
          </Routes>
        </AtmosphereProvider>
      </ModeProvider>
    </BrowserRouter>
  );
}

export default App;
