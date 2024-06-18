import React, { useContext } from "react";
import { DarkModeContext } from "../../Contexts/DarkModeContext";
import "../../Styles/Navbar.scss";
import { Link, useParams } from 'react-router-dom'

export default function Navbar() {
  const { dispatch } = useContext(DarkModeContext);
  const {mail} = useParams();
  var course_no = "";
  var i = 0;
  for(i;i<mail.length;i++) {
    if(mail[i+1] == '@')
      break;
  }
course_no += `${mail[i]}`

  return (
    // <>
    //   <div className="navbar">
    //     <div className="wrapper">
    //       {/* <div className="search">
    //         <input type="text" placeholder="Search..." />
    //         <span className="material-symbols-outlined">search</span>
    //       </div> */}
    //       <div className="items">
    //         {/* <div className="item">
    //           <span className="material-symbols-outlined">language</span>
    //           English
    //         </div> */}
    //         <div className="item">
    //           <span
    //             className="material-symbols-outlined"
    //             onClick={() => {
    //               dispatch({ type: "TOGGLE" });
    //             }}
    //           >
    //             dark_mode
    //           </span>
    //         </div>
    //         {/* <div className="item">
    //           <span className="material-symbols-outlined">fullscreen_exit</span>
    //         </div> */}
    //         {/* <div className="item">
    //           <span className="material-symbols-outlined">notifications</span>
    //           <div className="counter">1</div>
    //         </div> */}
    //         {/* <div className="item">
    //           <span className="material-symbols-outlined">chat_bubble</span>
    //           <div className="counter">2</div>
    //         </div> */}
    //         {/* <div className="item">
    //           <span className="material-symbols-outlined">
    //             format_list_bulleted
    //           </span>
    //         </div> */}
    //         <div className="item">
    //           <span className="material-symbols-outlined">account_circle</span>
    //         </div>
    //         <div className="item">
    //         <span className="material-symbols-outlined">logout</span>
    //         <Link to="/" style={{ textDecoration: "none" }}>
    //           <span className="logout"> Logout</span>
    //         </Link>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>

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
          <label>{`Hello, Lecturer${course_no}`}</label>
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
            {/* <div className="item">
              <span className="material-symbols-outlined">notifications</span>
              <div className="counter">1</div>
            </div> */}
            <div className="item">
            <Link to={`/Lecturer/${mail}/ProfilePage`} style={{ textDecoration: "none" }}>
              <span className="material-symbols-outlined">account_circle</span>
              </Link>
            </div>
            <div className="item">
            <span className="material-symbols-outlined">logout</span>
            <Link to="/" style={{ textDecoration: "none" }}>
              <span className="logout" onClick={() => {localStorage.setItem('lecturer', false)}}> Logout</span>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}
