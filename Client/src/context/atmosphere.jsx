// atmosphereContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
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
  const [volumes, setVolumes] = useState(new Array(sound.length).fill(0)); // Set default volume to 30
  const [isPlaying, setIsPlaying] = useState(
    new Array(sound.length).fill(false)
  );
  const { atmosphere, setAtmosphere } = useMode();

  const handleSliderChange = useCallback(
    (id, newValue, name) => {
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
    },
    [volumes, isPlaying, setVolumes, setIsPlaying]
  );

  const toggleIsPlaying = useCallback(
    (id) => {
      setIsPlaying((prevIsPlaying) => {
        const newIsPlaying = [...prevIsPlaying];
        newIsPlaying[id] = !newIsPlaying[id];
        return newIsPlaying;
      });
    },
    [setIsPlaying]
  );

  const contextValue = useMemo(
    () => ({
      volumes,
      handleSliderChange,
      isPlaying,
      toggleIsPlaying,
      setVolumes,
      setIsPlaying,
    }),
    [
      volumes,
      handleSliderChange,
      isPlaying,
      toggleIsPlaying,
      setVolumes,
      setIsPlaying,
    ]
  );

  return (
    <AtmosphereContext.Provider value={contextValue}>
      {children}
    </AtmosphereContext.Provider>
  );
};
