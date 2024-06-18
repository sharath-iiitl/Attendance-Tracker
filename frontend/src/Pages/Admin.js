import React, { useContext } from "react";
// import { Link } from "react-router-dom";
import Sidebar from "../Components/Admin/Sidebar";
import "./Admin.scss";
import Widgets from "../Components/Admin/Widgets";
import Featured from "../Components/Admin/Featured";
import Charts from "../Components/Admin/Charts";
import Navbar from "../Components/Admin/Navbar";
import '../Styles/DarkMode.scss'
import { DarkModeContext } from "../Contexts/DarkModeContext";
export default function Admin() {

  const {darkMode}=useContext(DarkModeContext)
  
  return (
    <div>
      <div className={darkMode?"home dark":"home"}>
        {/* <Sidebar /> */}
        <div
            className="offcanvas-lg offcanvas-end"
            tabIndex="-1"
            id="offcanvasResponsive"
            aria-labelledby="offcanvasResponsiveLabel"
          >
             <div className="offcanvas-header"> 
              <h5 className="offcanvas-title" id="offcanvasResponsiveLabel">
                Menu
              </h5> 
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                data-bs-target="#offcanvasResponsive"
                aria-label="Close"
              ></button>
             </div>
            <div className="offcanvas-body">{<Sidebar />}</div>
            </div>
        <div className="homeContainer">
        <Navbar/>
          <div className="boxes">
            <Widgets />
          </div>
          <div className="chartsComponent">
            <Featured />
            {/* <Charts /> */}
          </div>
        </div>
      </div>
      
    </div>
  );
}
