import Slider from "@mui/material/Slider";
import { styled } from "@mui/system";

const thumbStyle = {
  width: 45,
  height: 45,
  borderRadius: "50%",
  cursor: "pointer",
  position: "relative",
  backgroundColor: "rgba(169, 169, 169, 0.8)",
  backgroundClip: "content-box",
  backgroundOrigin: "content-box",
  "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
    boxShadow: "inherit",
  },
  "&::before": {
    content: "''",
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    backgroundSize: "60%",
    backgroundPosition: "center",
    backgroundImage: "url(/public/assets/icons/rain.svg)",
    backgroundRepeat: "no-repeat",
  },
};

const CustomSlider = styled(Slider)`
  && {
    color: ${(props) => (props.volume === 0 ? "#808080" : "#BB98FF")};
    margin-left: 10px;
    margin-right: 10px;
    width: 130px;
    height: 25px;
    padding: 10px;
    & .MuiSlider-thumb {
      ${thumbStyle}
      background-color: ${(props) =>
        props.volume === 0 ? "#808080" : "rgba(187, 152, 255, 1)"};
    }
    & .MuiSlider-track {
      background-color: rgba(187, 152, 255, 1);
      border: none;
    }
    &:hover .MuiSlider-thumb {
      background-color: ${(props) =>
        props.volume === 0 ? "#808080" : "rgba(187, 152, 255, 1)"};
    }
  }
`;

export default CustomSlider;
