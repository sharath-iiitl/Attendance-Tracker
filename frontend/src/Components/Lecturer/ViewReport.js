import React, { useCallback, useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import './List.scss'
import { useParams } from "react-router";
import axios from "axios"


export default function ViewReport_Lecturer() {

  const { mail } = useParams();
  const [uploaded, setUploaded] = useState([]);
  const [isloading, setLoading] = useState(false);  
  const [branch, setBranch] = useState("");

  var course_no = "";
  var i = 0;
  for(i;i<mail.length;i++) {
    if(mail[i+1] == '@')
      break;
  }
course_no += `${mail[i]}`

useEffect(() => {
  async function run() {
  if (isloading == true) {
  try {
    await axios.post('http://localhost:8082/attendance/get_attendance', { "course_name" : `Course${course_no}`, "branch" : branch})
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
}, [branch])

const handleGet = () => {
    var branch = document.getElementById("branch")
    const value_branch = branch.options[branch.selectedIndex].innerText
    switch(value_branch) {
      case "CSB" : setBranch("CB")
      break;
      case "CSAI" : setBranch("CI")
      break;
      default : setBranch(value_branch)
    }
    setLoading(true)
    var display_table = document.getElementById("table")
    display_table.style.display = "initial"
  }

  return (
    <div className='list'>
      {/* <Sidebar/> */}
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
      <div className='listContainer'>
        <Navbar/>
        <h1 className="headings">
      View Report
      </h1>
      <div>
      <select id="branch">
        <option style={{display : "none"}}></option>
        <option value="0">CS</option>
        <option value="1">IT</option>
        <option value="2">CSAI</option>
        <option value="3">CSB</option>
      </select>
      <button onClick={handleGet}>Get Details</button>
        </div>
    <div className="table-responsive" id="table" style={{display : "none"}}>
    <table className="table table-bordered table-striped">
  <thead className="table-dark">
    <tr>
      <th scope="col" style={{width : "25%"}}>Date</th>
      <th scope="col" style={{width : "25%"}}>Student Name</th>
      <th scope="col" style={{width : "25%"}}>Roll No</th>
      <th scope="col" style={{width : "25%"}}>Status</th>
    </tr>
  </thead>
  <tbody>
  {  uploaded.length == 0 ? <tr><th colSpan="4" style={{textAlign : "center"}}>No Records Found...</th></tr> : uploaded.map((row) => {
      return (
      <tr key={row.roll_no}>
      <th scope="row">{row.date}</th>
      <td>{row.name}</td>
      <td>{row.roll_no}</td>
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
      </div>
    </div>
  )
}
