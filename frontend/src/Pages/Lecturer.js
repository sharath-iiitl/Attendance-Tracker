import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Sidebar from "../Components/Lecturer/Sidebar";
import "./Admin.scss";
import Widgets from "../Components/Lecturer/Widgets";
import Featured from "../Components/Lecturer/Featured";
import Charts from "../Components/Lecturer/Charts";
import Navbar from "../Components/Lecturer/Navbar";
import '../Styles/DarkMode.scss'
import { DarkModeContext } from "../Contexts/DarkModeContext";
import { useParams } from "react-router";

export default function Lecturer() {
  const { mail } = useParams();
  var course_no = "";
  var i = 0;
  for(i;i<mail.length;i++) {
    if(mail[i+1] == '@')
      break;
  }
  course_no += `${mail[i]}`

  const {darkMode}=useContext(DarkModeContext)
  
  return (
    // <div>
    //   <div className={darkMode?"home dark":"home"}>
    //     <Sidebar />
    //     <div className="homeContainer">
    //     <Navbar/>
    //     <Widgets course_no = { course_no } />
    //       <div className="chartsComponent">
    //         <Featured />
    //         {/* <Charts /> */}
    //       </div>
    //     </div>
    //   </div>
      
    // </div>

    <div>
      <div className={darkMode ? "home dark" : "home"}>
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
          <Navbar />
          

          {/* <div className="alert alert-info d-none d-lg-block">
            Resize your browser to show the responsive offcanvas toggle.
          </div> */}

          
          {/* <div className="boxes"> */}
          <Widgets course_no = { course_no } />
          {/* </div> */}
          <div className="chartsComponent">
            <Featured />
            {/* <Featured /> */}
          </div>
        </div>
      </div>
    </div>

  );
}
