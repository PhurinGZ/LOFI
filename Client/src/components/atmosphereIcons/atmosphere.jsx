// atmoshpereButton.jsx
import Button from '@mui/material/Button';
import { useMode } from "../../context/modeContext";

const AtmosphereButton = () => {
  const { atmosphere, setAtmosphere } = useMode();

  const handleToggle = () => {
    // Check if the atmosphere is already stored
    if (atmosphere === "rain") {
      // If stored, remove it
      setAtmosphere(null);
    } else {
      // If not stored, store it
      setAtmosphere("rain");
    }
  };

  return (
    <Button
      variant="outlined"
      color="secondary"
      size="large"
      onClick={handleToggle}
    >
      Atmosphere Button
    </Button>
  );
};

export default AtmosphereButton;
