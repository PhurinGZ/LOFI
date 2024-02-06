// ModeContext.js
import { createContext, useContext, useState, useMemo } from "react";
import { typeLofi } from "../data/chooseVideo";

const ModeContext = createContext();

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context; // Returning the entire context object
};

export const ModeProvider = ({ children }) => {
  const [mode, setMode] = useState(null);
  const [dayNight, setDayNight] = useState("day");
  const [atmosphere, setAtmosphere] = useState(null);
  const [changedImage, setChangedImage] = useState(typeLofi[0]?.video[2]);

  const toggleMode = (selectedMode) => {
    setMode(selectedMode);
  };

  const value = useMemo(() => ({
    mode,
    dayNight,
    atmosphere,
    changedImage,
    setDayNight,
    toggleMode,
    setAtmosphere,
    setChangedImage,
  }), [mode, dayNight, atmosphere, changedImage, setDayNight, toggleMode, setAtmosphere, setChangedImage]);

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
};
