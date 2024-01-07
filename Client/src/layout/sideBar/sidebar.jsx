import React, { useState } from "react";
import "./styles.scss";
import Tooltip from "@mui/material/Tooltip";
import Catagory from "../catagory/catagory";
import Atmospherebtn from "../../components/atmospheresrtting/Atmospherebtn";

function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const handleBarIconClick = () => {
    console.log('isMenuOpen before:', isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
    console.log('isMenuOpen after:', isMenuOpen);
  };


  return (
    <>
      <div className={`sidebar ${isMenuOpen ? "open" : ""}`}>
        <div className="barIcon" onClick={handleBarIconClick}>
          <img
            src={
              isMenuOpen
                ? "/assets/icons/drop-down.png"
                : "/assets/icons/drop-down.png"
            }
            alt=""
          />
        </div>
          <div className={`menuBar ${isMenuOpen ? "display-block" : ""}`}>
            <ul>
              <li>
                <span href="#">
                  <Tooltip title="Category" placement="right-start"> 
                    <span>
                      <Catagory />
                    </span>
                  </Tooltip>
                </span>
              </li>

              <li>
                <span>
                  <Tooltip title="Atmospheresetting" placement="right-start">
                    <span><Atmospherebtn /></span>
                  </Tooltip>
                </span>
              </li>
              <li>
                <span href="#">
                  <Tooltip title="Calendar" placement="right-start">
                    <img src="/assets/icons/timetable.png" alt=""/>
                  </Tooltip>
                </span>
              </li>
              <li>
                <span href="#">
                  <Tooltip title="Notes" placement="right-start">
                    <img src="/assets/icons/notes.png" alt="" />
                  </Tooltip>
                </span>
              </li>

              <li style={{ marginTop: "100px" }}>
                <span href="#">
                  <Tooltip title="Settings" placement="right-start">
                    <img src="/assets/icons/setting.png" alt="" />
                  </Tooltip>
                </span>
              </li>
              <li>
                <span href="#">
                  <Tooltip title="Login" placement="right-start">
                    <img src="/assets/icons/user.png" alt="" />
                  </Tooltip>
                </span>
              </li>
            </ul>
          </div>
      </div>
    </>
  );
}
export default Sidebar;
