import React, { useContext } from "react";
import "../../Styles/Sidebar.scss";
import { Link, useParams } from "react-router-dom";
import { DarkModeContext } from "../../Contexts/DarkModeContext";
export default function Sidebar() {
  const { mail } = useParams();
  const {dispatch}=useContext(DarkModeContext)
  

  return (
    <div className="sidebar">
      <div className="top">
        <Link to={`/Student/${mail}`} style={{ textDecoration: "none"}}>
          <span>Student</span>
        </Link>
      </div>
      {/* <hr /> */}
      <div className="centre">
        <div>
        <label>MAIN</label>
        <ul>
          <li>
            <span className="material-symbols-outlined">Dashboard</span>
            <Link to={`/Student/${mail}`} style={{ textDecoration: "none"}}>
            <span>Dashboard</span>
            </Link>
          </li>
        </ul>
        </div>
        <div>
          <ul>
          <label>SERVICES</label>
          <li>
          <Link to={`/Student/${mail}/MyAttendance`} style={{ textDecoration: "none" }}>
            <span>Attendance</span>
            </Link>
          </li>
          <li>
          <Link to={`/Student/${mail}/LeaveRequest`} style={{ textDecoration: "none" }}>
            <span>Leave Request</span>
            </Link>
          </li>
          <li>
          <Link to={`/Student/${mail}/ViewReport`} style={{ textDecoration: "none" }}>
            <span>View Report</span>
            </Link>
          </li>
          </ul>
          </div>
          <div>
          <ul>
          <label>USER</label>
          <li>
            <span className="material-symbols-outlined">account_circle</span>
            <Link to={`/Student/${mail}/ProfilePage`} style={{ textDecoration: "none" }}>
            <span>Profile</span>
            </Link>
          </li>
          <li>
            <span className="material-symbols-outlined">logout</span>
            <Link to="/" style={{ textDecoration: "none" }}>
              <span className="logout"> Logout</span>
            </Link>
          </li>
        </ul>
        </div>
      </div>
      {/* <div className="buttom">
        <h3>color options</h3>
        <ul>
          <li onClick={()=>dispatch({type:"LIGHT"})}>
            <span className="material-symbols-outlined">light_mode</span>
            Light Mode
          </li>
          <li onClick={()=>dispatch({type:"DARK"})}>
            <span className="material-symbols-outlined">dark_mode</span>
            Dark Mode
          </li>
        </ul>
      </div> */}
    </div>
  );
}
