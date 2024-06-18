import React, { useCallback, useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import './List.scss'
import { useParams } from "react-router";
import axios from "axios"


export default function ViewReport() {

  const { mail } = useParams();
  const [uploaded, setUploaded] = useState([]);
  const [isloading, setLoading] = useState(true);
  const branch = mail.slice(1,3).toUpperCase()
  const roll_no = parseInt(mail.slice(8,10))

useEffect(() => {
  async function run() {
  if (isloading == true) {
  try {
    await axios.post('http://localhost:8082/attendance/get_attendance', { "roll_no" : `${roll_no}`, "branch" : `${branch}`})
    .then(info => {
      setUploaded(info.data)
      console.log(info.data);
    })
    .then(setLoading(false))
  } catch (error) {
    console.log(error);
  }
  }
  }
  run();
}, [])

  return (
//     <div className='list'>
//       <Sidebar/>
//       <div className='listContainer'>
//         <Navbar/>
//         <div>
//       Attendance
//       </div>
//     <div className="table-responsive" id="table">
//     <table className="table table-bordered table-striped">
//   <thead className="table-dark">
//     <tr>
//       <th scope="col">Date</th>
//       <th scope="col">Course Name</th>
//       <th scope="col">Status</th>
//     </tr>
//   </thead>
//   <tbody>
//   {  uploaded.length == 0 ? <tr><th colSpan="4" style={{textAlign : "center"}}>No Records Found...</th></tr> : uploaded.map((row) => {
//       return (
//       <tr key={row.roll_no}>
//       <th scope="row">{row.date}</th>
//       <td>{row.course_name}</td>
//       <td>
//         <div className="cellAction">
//         {row.status == 'p'
//         ?  <div className="presentButton"style={{backgroundColor : "green", color : "white"}}>Present</div>
//         : <div className="absentButton"style={{backgroundColor : "red", color : "white"}}>Absent</div>
//         }
//         </div>
//       </td>
//       </tr> );
//     })
//   }
//   </tbody>
// </table>
// </div>
//       </div>
//     </div>

  <div>
      <div className='list'>
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
        <div className="listContainer">
          <Navbar />
          

          {/* <div className="alert alert-info d-none d-lg-block">
            Resize your browser to show the responsive offcanvas toggle.
          </div> */}

          <h1 className="headings">
      Report
      </h1>
    <div className="table-responsive" id="table">
    <table className="table table-bordered table-striped">
  <thead className="table-dark">
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Course Name</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
  {  uploaded.length == 0 ? <tr><th colSpan="4" style={{textAlign : "center"}}>No Records Found...</th></tr> : uploaded.map((row) => {
      return (
      <tr key={row.roll_no}>
      <th scope="row">{row.date}</th>
      <td>{row.course_name}</td>
      <td>
        <div className="cellAction">
        {row.status == 'p'
        ?  <div className="presentButton"style={{backgroundColor : "green", color : "white"}}>Present</div>
        : <div className="absentButton"style={{backgroundColor : "red", color : "white"}}>Absent</div>
        }
        </div>
      </td>
      </tr> );
    })
  }
  </tbody>
</table>
</div>
          {/* <div className="boxes">
            <Widgets />
          </div> */}
          {/* <div className="chartsComponent">
            <Featured />
            {/* <Featured /> */}
          </div>
        </div>
      </div>

  )
}
