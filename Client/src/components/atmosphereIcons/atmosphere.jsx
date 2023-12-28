// atmoshpereButton.jsx
import Button from "@mui/material/Button";
import { useMode } from "../../context/modeContext";
import "./style.scss";

const AtmosphereButton = () => {
  const { atmosphere, setAtmosphere } = useMode();

  const handleToggle = () => {
    // Check if the atmosphere is already stored
    if (atmosphere === "rain") {
      // If stored, remove it
      setAtmosphere("");
    } else {
      // If not stored, store it
      setAtmosphere("rain");
    }
  };

  return (
    <div className="button-rain"     onClick={handleToggle}>
        <img src="/public/assets/icons/rain.png" alt="" />
    </div>
  );
};

export default AtmosphereButton;
