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
// import Register from "./components/membership/register";
// import Login from "./components/membership/Login";
import { AuthProvider } from "./context/authContext";
import ResetPassword from "./page/forgetPassword";
import MyEditor from "./components/note/note";
import ListNote from "./components/note/listNote";
// import { Provider } from "react-redux";
// import store from "./reduxcore/store/index";
import { NoteProvider } from "./context/noteContext";

function App() {
  return (
    // <Provider >
    <BrowserRouter>
      <AuthProvider>
        <ModeProvider>
          <AtmosphereProvider>
            <NoteProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/category" element={<Cat />} />
                <Route path="/sidebar" element={<Sidebar />} />
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
                <Route path="/note" element={<MyEditor />} />
                <Route path="/list-note" element={<ListNote />} />
              </Routes>
            </NoteProvider>
          </AtmosphereProvider>
        </ModeProvider>
      </AuthProvider>
    </BrowserRouter>
    // </Provider>
  );
}

export default App;
