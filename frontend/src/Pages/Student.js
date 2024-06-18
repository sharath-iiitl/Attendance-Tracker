import React, { useContext } from "react";
// import { Link } from "react-router-dom";
import Sidebar from "../Components/Student/Sidebar";
import "./Admin.scss";
import Widgets from "../Components/Student/Widgets";
import Featured from "../Components/Student/Featured";
// import Charts from "../Components/Student/Charts";
// import Navbar from "../Components/Student/Navbar";
// import '../Styles/DarkMode.scss'
// import { DarkModeContext } from "../Contexts/DarkModeContext";
// import { UserContext } from "../Contexts/UserContext";

// export default function Student() {
//   const { user } = useContext(UserContext);
//   const {darkMode}=useContext(DarkModeContext);
//   console.log(user);
//   return (
//     <div>
//       <div className={darkMode?"home dark":"home"}>
//         <Sidebar />
//         <div className="homeContainer">
//         <Navbar/>
//           <div className="boxes">
//             <Widgets />
//           </div>
//           <div className="chartsComponent">
//             <Featured />
//             {/* <Charts /> */}
//           </div>
//         </div>
//       </div>
      
//     </div>
//   );
// }

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import "../Components/Student/Widgets.scss";

// export default function Student() {

//   const { mail } = useParams()
//   const [isloading, setLoading] = useState(true)
//   const [total_classes, setTotal] = useState(0);
//   const [present, setPresent] = useState(0);
//   const [absent, setAbsent] = useState(0);
//   const [color, setColor] = useState("");
//   useEffect(() => {
//     if(isloading == true) {
//       try {
//         console.log(mail)
//         axios.post('http://localhost:8082/student/count', { roll_no : 13})
//         .then(info => setTotal(info.data))
//       }
//       catch (err) {
//         console.log(err);
//       }
//       try {
//         axios.post('http://localhost:8082/student/count', { roll_no : 13, status : "p"})
//         .then(info => setPresent(info.data))
//         .then(setLoading(false))
//       }
//       catch (err) {
//         console.log(err);
//       }
//     }
//     if(present * 100 / total_classes < 65)
//       setColor("red")
//     else
//       setColor("green")
//   }
//   )

//   const {darkMode}=useContext(DarkModeContext)
//   return (
//     <div>
//       <div className={darkMode?"home dark":"home"}>
//         <Sidebar />
//         <div className="homeContainer">
//         <Navbar/>
//           <div className="boxes">
//           <div className="widgets">
//     <div className="widget">
//         <span className="title">Total Classes</span>
//         <span className="counter">{total_classes}</span>
//     </div>
//     <div className="widget">
//         <span className="title">Present</span>
//         <span className="counter">{present}</span>
//     </div>
//     <div className="widget">
//         <span className="title">Absent</span>
//         <span className="counter">{total_classes - present}</span>
//     </div>
//     <div className="widget" style={{backgroundColor : `${color}`, color : "white"}}>
//         <span className="title" style={{color : "white"}}>Percentage</span>
//         <span className="counter">{`${(present * 100 / total_classes).toFixed(2)}%`}</span>
//     </div>
//   </div>
//           </div>
//           <div className="chartsComponent">
//             <Featured />
//             <Charts />
//           </div>
//         </div>
//       </div>
      
//     </div>
//   );
// }

import Charts from "../Components/Student/Charts";
import Navbar from "../Components/Student/Navbar";
import "../Styles/DarkMode.scss";
import { DarkModeContext } from "../Contexts/DarkModeContext";

export default function Student() {
  const { darkMode } = useContext(DarkModeContext);
  console.log(localStorage.getItem('student'));
  return (
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

          
          <div className="boxes">
            <Widgets />
          </div>
          <div className="chartsComponent">
            <Featured />
            {/* <Featured /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
