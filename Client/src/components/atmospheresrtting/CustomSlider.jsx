import Slider from "@mui/material/Slider";
import styled from "@emotion/styled";

const CustomSlider = styled(Slider)(
  ({ index, volume, disabled }) => `
    && {
      color: ${volume === 0 ? "#808080" : "#BB98FF"};
      margin-left: 10px;
      margin-right: 10px;
      width: 130px;
      height: 25px;
      padding: 10px;

      & .MuiSlider-thumb {
        width: 45px;
        height: 45px;
        border-radius: "50%";
        cursor: ${disabled ? "not-allowed" : "pointer"};
        position: "relative";
        background-color: "rgba(169, 169, 169, 0.8)";
        background-clip: "content-box";
        background-origin: "content-box";
        &:focus, &:hover, &.Mui-active, &.Mui-focusVisible {
          box-shadow: inherit;
        }
        
        &::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          background-size: 60%;
          background-position: center;
          background-image: url(${index});
          background-repeat: no-repeat;
        }

        background-color: ${volume === 0 ? "#808080" : "rgba(187, 152, 255, 1)"};
      }

      & .MuiSlider-track {
        background-color: rgba(187, 152, 255, 1);
        border: none;
      }

      &:hover .MuiSlider-thumb {
        background-color: ${volume === 0 ? "#808080" : "rgba(187, 152, 255, 1)"};
      }
    }
  `
);

export default CustomSlider;
