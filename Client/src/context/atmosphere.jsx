// atmosphereContext.jsx
import React, { createContext, useContext, useState } from "react";
import { sound } from "../data/atmosphere";
import { useMode } from "./modeContext";

const AtmosphereContext = createContext();

export const useAtmosphereContext = () => {
  const context = useContext(AtmosphereContext);
  if (!context) {
    throw new Error(
      "useAtmosphereContext must be used within an AtmosphereProvider"
    );
  }
  return context;
};

export const AtmosphereProvider = ({ children }) => {
  const [volumes, setVolumes] = useState(sound.map(() => 30)); // Set default volume to 30
  const [isPlaying, setIsPlaying] = useState(Array(sound.length).fill(false));
  const { atmosphere, setAtmosphere } = useMode();

  const handleSliderChange = (id, newValue, name) => {
    if (!Number.isFinite(newValue)) {
      return;
    }

    const newVolumes = [...volumes];
    const newIsPlaying = [...isPlaying];

    if (newValue === 0) {
      newIsPlaying[id] = false;
    } else {
      newIsPlaying[id] = true;
    }

    newVolumes[id] = newValue;

    setVolumes(newVolumes);
    setIsPlaying(newIsPlaying);
  };

  const toggleIsPlaying = (id) => {
    setIsPlaying((prevIsPlaying) => {
      const newIsPlaying = [...prevIsPlaying];
      newIsPlaying[id] = !newIsPlaying[id];
      // console.log("newIsPlaying : ", newIsPlaying);
      return newIsPlaying;
    });
  };

  return (
    <AtmosphereContext.Provider
      value={{
        volumes,
        handleSliderChange,
        isPlaying,
        toggleIsPlaying,
        setVolumes,
        setIsPlaying,
      }}
    >
      {children}
    </AtmosphereContext.Provider>
  );
};
