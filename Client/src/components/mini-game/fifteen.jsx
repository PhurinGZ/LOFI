import { React, useState } from "react";
import "./fifteen.scss";
import Board from "./board/Board";
import CloseIcon from "@mui/icons-material/Close";
import Draggable from "react-draggable";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import Tooltip from "@mui/material/Tooltip";
import { useMediaQuery } from "@mui/material";

function Fifteen() {
  const [opengame, setOpenGame] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [isDraggable, setIsDraggable] = useState(!isSmallScreen);

  const clickOpenGane = () => {
    setOpenGame(true);
  };
  return (
    <div style={{ color: "#fff" }}>
      {" "}
      <Tooltip title="15 puzzle" placement="right-start">
        <button onClick={clickOpenGane} className="img-icon-category">
          <SportsEsportsIcon sx={{ color: "#fff", fontSize: "35px" }} />
        </button>
      </Tooltip>
      {opengame && (
        <Draggable
          disabled={isSmallScreen || !isDraggable}
          handle=".headergame"
        >
          <div className="fifteen">
            <div
              className="headergame"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "move",
              }}
            >
              <h1
                style={{
                  padding: "10px",
                  textShadow: "0px 0px 10px rgba(227, 203, 115, 0.69)",
                  fontSize: "1.5rem",
                }}
              >
                GAME 15 PUZZLE
              </h1>
              <CloseIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setOpenGame(false);
                }}
              />
            </div>
            <Board />
          </div>
        </Draggable>
      )}
    </div>
  );
}

export default Fifteen;
