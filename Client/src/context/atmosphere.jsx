// context.jsx
import React, { createContext, useContext, useState } from "react";
import { sound } from "../data/atmosphere";

const AtmosphereContext = createContext();

export const useAtmosphereContext = () => {
  const context = useContext(AtmosphereContext);
  if (!context) {
    throw new Error("useAtmosphereContext must be used within an AtmosphereProvider");
  }
  return context;
};

export const AtmosphereProvider = ({ children }) => {
  const [volumes, setVolumes] = useState(sound.map(() => 0));
  const [isPlaying, setIsPlaying] = useState(Array(sound.length).fill(false));

  const handleSliderChange = (index, newValue) => {
    const newVolumes = [...volumes];
    const newIsPlaying = [...isPlaying];

    if (newValue === 0) {
      newIsPlaying[index] = false;
    } else {
      newIsPlaying[index] = true;
    }

    newVolumes[index] = newValue;
    setVolumes(newVolumes);
    setIsPlaying(newIsPlaying);
  };

  return (
    <AtmosphereContext.Provider
      value={{
        volumes,
        handleSliderChange,
        isPlaying,
      }}
    >
      {children}
    </AtmosphereContext.Provider>
  );
};
