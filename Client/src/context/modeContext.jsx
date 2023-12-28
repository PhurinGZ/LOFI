// ModeContext.js
import { createContext, useContext, useState } from "react";
import { typeLofi } from "../data/chooseVideo";

const ModeContext = createContext();

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  // console.log(context)
  return context; // Returning the entire context object
};

export const ModeProvider = ({ children }) => {
  const [mode, setMode] = useState();
  const [dayNight, setDayNight] = useState("day");
  const [atmosphere, setAtmosphere] = useState();
  const [changedImage, setChangedImage] = useState(typeLofi[0].video[0]);

  const toggleMode = (selectedMode) => {
    setMode(selectedMode);
  };

  const value = {
    mode,
    dayNight,
    atmosphere,
    changedImage,
    setDayNight,
    toggleMode,
    setAtmosphere,
    setChangedImage,
  };

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
};
