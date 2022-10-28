import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import GroupsIcon from "@mui/icons-material/Groups";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import GradingIcon from "@mui/icons-material/Grading";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import QueuePlayNextIcon from "@mui/icons-material/QueuePlayNext";
import SettingsVoiceIcon from "@mui/icons-material/SettingsVoice";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";
import { logout } from '../../firebase'

function Sidebar() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login")
    } catch  {
      alert("Error!")
    }
  }

  return (
    <div className="sidebar">
      <div className="sidebar_top">
        <Link to="/">
          <span className="logo">ASA Admin</span>
        </Link>
      </div>
      <hr />
      <div className="sidebar_wrapper">
        <ul>
          <p className="sidebar_section-title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="sidebar_section-title">LISTS</p>
          <Link to="/students" style={{ textDecoration: "none" }}>
            <li>
              <SchoolIcon className="icon" />
              <span>Students</span>
            </li>
          </Link>
          <li>
            <GroupsIcon className="icon" />
            <span>Teachers</span>
          </li>
          <li>
            <CreateIcon className="icon" />
            <span>Writing</span>
          </li>
          <li>
            <KeyboardVoiceIcon className="icon" />
            <span>Speaking</span>
          </li>
          <p className="sidebar_section-title">REVIEW</p>
          <li>
            <GradingIcon className="icon" />
            <span>Writing</span>
          </li>
          <li>
            <SettingsVoiceIcon className="icon" />
            <span>Speaking</span>
          </li>
          <p className="sidebar_section-title">SERVICE</p>
          <li>
            <NoteAddIcon className="icon" />
            <span>Add Writing</span>
          </li>
          <li>
            <QueuePlayNextIcon className="icon" />
            <span>Add Speaking</span>
          </li>
          <p className="sidebar_section-title">USER</p>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
