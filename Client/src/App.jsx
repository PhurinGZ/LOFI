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
import Fifteen from "./components/mini-game/fifteen";
// import TestPage from "./components/testPage/test";

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <ModeProvider>
        <AtmosphereProvider>
          <NoteProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/demo" element={<Demo />} />
              <Route path="/category" element={<Cat />} />
              <Route path="/sidebar" element={<Sidebar />} /> */}
              <Route
                path="/verify-email/:emailToken"
                element={<VerifyEmail />}
              ></Route>
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              ></Route>
              {/* <Route path="/:auth" element={<Register />} />
          <Route path="/:auth" element={<Login />} /> */}
              {/* <Route path="/note" element={<MyEditor />} />
              <Route path="/list-note" element={<ListNote />} />
              <Route path="/fifteen" element={<Fifteen />} /> */}
              {/* <Route path="/test" element={<TestPage />} /> */}
            </Routes>
          </NoteProvider>
        </AtmosphereProvider>
      </ModeProvider>
    </AuthProvider>
  </BrowserRouter>
  );
}

export default App;
