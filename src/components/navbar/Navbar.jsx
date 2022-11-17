import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import CreateIcon from "@mui/icons-material/Create";
import "./navbar.scss";
import { Link } from "react-router-dom";

function Navbar({ currentUserData }) {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <ul className="items">
          <li className="item">
            <DarkModeOutlinedIcon className="icon" />
          </li>
          <li className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
          </li>
          <li className="item">
            <CreateIcon className="icon" />
          </li>
          <li className="item">
            <KeyboardVoiceIcon className="icon" />
          </li>
          <Link to="/edit">
            <li className="item">
              <img src={currentUserData.img} alt="" className="avatar" />
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
