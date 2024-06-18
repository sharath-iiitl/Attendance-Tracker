import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../Contexts/DarkModeContext";
import "../../Styles/Navbar.scss";
import { Link } from 'react-router-dom'
import axios from "axios";

export default function Navbar() {
  const { dispatch } = useContext(DarkModeContext);
  const [count, setCount] = useState(0);
  const [isloading, setLoading] = useState(true);
  useEffect(() => {
    if(isloading == true) {
      try {
        axios.post('http://localhost:8082/request/count', {"status" : "pending"})
        .then(res => setCount(res.data))
        .then(setLoading(false))
      }
      catch (err) {
        console.log(err);
      }
    }
  })
  return (
    <>
      <div className="navbar">
      <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasResponsive"
            aria-controls="offcanvasResponsive"
            style={{marginLeft : "5px"}}
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button> */}
          <label>Hello, Admin</label>
        <div className="wrapper">
          <div className="items">
            <div className="item">
            
              {/* <span
                className="material-symbols-outlined"
                onClick={() => {
                  dispatch({ type: "TOGGLE" });
                }}
              >
                dark_mode
              </span> */}
            </div>
            <div className="item">
            <Link to="/Admin/LeaveRequests" style={{ textDecoration: "none" }}>
              <span className="material-symbols-outlined">notifications</span>
              </Link>
              <div className="counter">{count}</div>
            </div>
            <div className="item">
            <Link to="/Admin/ProfilePage" style={{ textDecoration: "none" }}>
              <span className="material-symbols-outlined">account_circle</span>
              </Link>
            </div>
            <div className="item">
            <span className="material-symbols-outlined">logout</span>
            <Link to="/" style={{ textDecoration: "none" }}>
              <span className="logout" onClick={() => {localStorage.setItem('admin', false)}}> Logout</span>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
