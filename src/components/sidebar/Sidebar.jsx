import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import GroupsIcon from "@mui/icons-material/Groups";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

function Sidebar({ currentUserData }) {
  const navigate = useNavigate();

  const logOut = () => {
    try {
      signOut(auth).then(() => console.log("signed out!"))
      
      navigate("/login");
    } catch (error) {
      console.log("Error logging out: ", error);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar_top">
        <Link to="/">
          <span className="logo">ASA Admin</span>
        </Link>
      </div>
      {/* <hr /> */}
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
          <Link to="/teachers" style={{ textDecoration: "none" }}>
            <li>
              <GroupsIcon className="icon" />
              <span>Teachers</span>
            </li>
          </Link>
          <Link to="submitted/answers" style={{ textDecoration: "none" }}>
            <li>
              <CreateIcon className="icon" />
              <span>Submitted Answers</span>
            </li>
          </Link>
          {/* <Link to="submitted/writing" style={{ textDecoration: "none" }}>
            <li>
              <CreateIcon className="icon" />
              <span>Submitted Writing</span>
            </li>
          </Link>
          <Link to="submitted/speaking" style={{ textDecoration: "none" }}>
            <li>
              <CreateIcon className="icon" />
              <span>Submitted Speaking</span>
            </li>
          </Link> */}
          {/* <li>
            <KeyboardVoiceIcon className="icon" />
            <span>Submitted Speaking</span>
          </li> */}
          <Link to="/questions/writing" style={{ textDecoration: "none" }}>
            <li>
              <SchoolIcon className="icon" />
              <span>Courses</span>
            </li>
          </Link>
          <p className="sidebar_section-title">SERVICE</p>
          {/* <Link to="/update/Writing" style={{ textDecoration: "none" }}>
            <li>
              <NoteAddIcon className="icon" />
              <span>Add Writing</span>
            </li>
          </Link> */}
          <Link to="/service/CELPIP-writing" style={{ textDecoration: "none" }}>
            <li>
              <NoteAddIcon className="icon" />
              <span>Add CELPIP Writing</span>
            </li>
          </Link>
          <Link to="/update/Speaking" style={{ textDecoration: "none" }}>
            <li>
              <NoteAddIcon className="icon" />
              <span>Add CELPIP Speaking</span>
            </li>
          </Link>
          <Link to="/service/IELTS-writing" style={{ textDecoration: "none" }}>
            <li>
              <NoteAddIcon className="icon" />
              <span>Add IELTS Writing</span>
            </li>
          </Link>
          <Link to="/service/IELTS-speaking" style={{ textDecoration: "none" }}>
            <li>
              <NoteAddIcon className="icon" />
              <span>Add IELTS Speaking</span>
            </li>
          </Link>
          <p className="sidebar_section-title">USER</p>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <li onClick={logOut}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
