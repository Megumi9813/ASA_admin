import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import CreateIcon from "@mui/icons-material/Create";
import Avatar from "@mui/material/Avatar";
import './navbar.scss'

function Navbar() {
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
          <li className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
