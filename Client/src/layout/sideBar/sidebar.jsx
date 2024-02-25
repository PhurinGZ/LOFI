// sidebar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import Tooltip from "@mui/material/Tooltip";
import Catagory from "../catagory/catagory";
import Atmospherebtn from "../../components/atmospheresrtting/Atmospherebtn";
import { useAuth } from "../../context/authContext";
import ListNote from "../../components/note/listNote";
import LinkYoutube from "../../components/link_youtube/linkYoutube";
import Fifteen from "../../components/mini-game/fifteen";

function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { path, user } = useAuth();

  const handleBarIconClick = () => {
    // console.log('isMenuOpen before:', isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
    // console.log('isMenuOpen after:', isMenuOpen);
  };

  return (
    <>
      <div className={`sidebar ${isMenuOpen ? "open" : ""}`}>
        {/* <div className="barIcon" onClick={handleBarIconClick}>
          <img
            src={
              isMenuOpen
                ? "/assets/icons/drop-down.png"
                : "/assets/icons/drop-down.png"
            }
            alt=""
          />
        </div> */}
        <div className={`menuBar ${isMenuOpen ? "display-block" : ""}`}>
          <ul className="S-ul">
            <li className="S-li">
              <span href="#">
                <Tooltip title="Category" placement="right-start">
                  <span>
                    <Catagory />
                  </span>
                </Tooltip>
              </span>
            </li>

            <li className="S-li">
              <span>
                <Tooltip title="Atmospheresetting" placement="right-start">
                  <span>
                    <Atmospherebtn />
                  </span>
                </Tooltip>
              </span>
            </li>

            <li className="S-li">
              <span href="#">
                <Tooltip title="Note" placement="right-start">
                  <ListNote />
                </Tooltip>
              </span>
            </li>
            <li className="S-li">
              <span href="#">
                <Tooltip title="#" placement="right-start">
                  <Fifteen />
                </Tooltip>
              </span>
            </li>

            {/* <li className="S-li" style={{ marginTop: "100px" }}>
              <span href="#">
                <Tooltip title="Settings" placement="right-start">
                  <img src="/assets/icons/setting.png" alt="" />
                </Tooltip>
              </span>
            </li> */}
            <li className="S-li" style={{ marginTop: "100px" }}>
              <span href="#">
                <Tooltip title="Login" placement="right-start">
                  <Link to={path}>
                    <img src="/assets/icons/user.png" alt="" />
                  </Link>
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
