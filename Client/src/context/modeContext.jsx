// ModeContext.js
import { createContext, useContext, useState } from "react";

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
  const [dayNight, setDayNight] = useState();
  const [atmosphere, setAtmosphere] = useState();

  const toggleMode = (selectedMode) => {
    setMode(selectedMode);
  };

  const value = {
    mode,
    dayNight,
    atmosphere,
    setDayNight,
    toggleMode,
    setAtmosphere,
  };

  return (
    <ModeContext.Provider value={value}>{children}</ModeContext.Provider>
  );
};
