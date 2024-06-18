import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import "./Home.scss"
import photo from './Image2.png'
export default function Home(props) {
  return (
    <>
    {/* <div className="top_home">
      <span id="title">Attendance Tracker</span>
    </div> */}
    {/* <h1>Attendance-tracker</h1>
      
      <button >
      <Link to="/Login" >Students</Link>
      </button>
      <button >
      <Link to="/Login_A">Admin</Link>
      </button>
      <button >
      <Link to="/Login_t">Teachers</Link>
      </button> */}
      <div className="home">
        <div className="home_left">
        <span id="title">Attendance Tracker</span>
          <img src={photo} id="photo_home"/>
        </div>
        <div className="widgets_home">
        <span id="side_title">Attendance Tracker</span>
    <div className="widget_home">
        <span className="title_home">
        {/* <Link to="/Login_Student" onClick={() => {props.setRole("Student")}}> */}
        <Link to="/Login_Student">
        Student
        </Link>
        </span>
    </div>
    <div className="widget_home">
    <span className="title_home">
    <Link to="/Login_Lecturer" onClick={() => {props.setRole("Lecturer")}}>
        Lecturer
        </Link>
        </span>
    </div>
    <div className="widget_home">
    <span className="title_home">
    <Link to="/Login_Admin" onClick={() => {props.setRole("Admin")}}>
        Admin
        </Link>
        </span>
    </div>
  </div>
      </div>
    </>
  )
}
