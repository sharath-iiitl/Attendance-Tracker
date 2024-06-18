import "./Datatable.scss";
// import { checkGridRowIdIsValid, DataGrid, GridLoadingOverlay, selectedIdsLookupSelector } from "@mui/x-data-grid";
// import { userColumns } from "../../Datatablesource";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const ModifyAttendance = () => {
  const { mail } = useParams();
  const [uploaded, setUploaded] = useState([]);
  const [isloading, setLoading] = useState(false);
  const [date,setDate] = useState("");
  const [submit, setSubmit] = useState(0);
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
    const id = [];
  try {
    await axios.post('http://localhost:8082/attendance/get_attendance', { "date" : `${date}`, "branch" : `${branch}`, "course_name" : `Course${course_no}` })
    .then(info => {
      setUploaded(info.data.sort((a, b)  => {return a.roll_no - b.roll_no}))
      console.log(info.data);
      // info.data.forEach((obj) => {id.push(obj.roll_no)})
      // setIds(id);
    })
    .then(setLoading(false))
  } catch (error) {
    console.log(error);
  }
  }
  }
  run();
  // uploaded.sort((a, b) => { return a.roll_no - b.roll_no })
  console.log("Run")
}, [submit, branch, date])


// getdata();

const present = [];
const absent = [];
const send_data = [];

const handleSubmit = () => {
  let count = 0;
  // for(let i=1;i<=data.length;i++) {
    uploaded.forEach((i) => {
    const insertp = document.querySelector(`#p${i.roll_no}`);
    if(insertp.style.backgroundColor == "green") {
      if(i.status != "p") {
        i.status = "p";
        present.push(i);
        count++;
      } }
    const inserta = document.querySelector(`#a${i.roll_no}`);
    if(inserta.style.backgroundColor == "red") {
      if(i.status != "a") {
        i.status = "a";
        absent.push(i);
        count++;
      } }
  })
  // console.log(present);
  // var filteredp = uploaded.filter((row) => {return present.indexOf(row.id) !== -1})
  // console.log(filteredp);
  // var filtereda = uploaded.filter((row) => {return absent.indexOf(row.id) !== -1})
  // console.log(filtereda);
  present.forEach((item) => {
    const individual = {
      "status" : "p",
      "_id" : item._id
    }
    send_data.push(individual);
  })

  absent.forEach((item) => {
    const individual = {
      "status" : "a",
      "_id" : item._id
    }
    send_data.push(individual);
  })

  const mark_students = { "data" : send_data }
  console.log(send_data);
  for(let j=0;j<send_data.length;j++) {
  try{
    axios.put('http://localhost:8082/attendance/update_student', send_data[j])
  }
  catch (err) {
    console.log(err);
  }
}
  setLoading(true);
  if(submit == 0)
    setSubmit(1);
  else
    setSubmit(0);
  alert(`Updated ${count} records`)
}



const color = (e, status) => {
  if(status == 'p') {
    const id = 'a' + e.target.id.slice(1);
    const a = document.getElementById(id);
    if(a.style.backgroundColor == "red") {
      a.style.backgroundColor = "white";
      a.style.color = "red";
    }
    e.target.style.backgroundColor = "green"
    e.target.style.color = "white"
}
  else {
    const id = 'p' + e.target.id.slice(1);
    const p = document.getElementById(id);
    if(p.style.backgroundColor == "green") {
      p.style.backgroundColor = "white";
      p.style.color = "green";
    }
    e.target.style.backgroundColor = "red"
    e.target.style.color = "white"
  }
}

const check = (e) => {
  console.log(e.target.checked)
}

const handleGet = () => {
  var branch = document.getElementById("branch")
  const value_branch = branch.options[branch.selectedIndex].innerText
  var date = document.getElementById("date")
  const value_date = date.value
  setDate(value_date);
  switch(value_branch) {
    case "CSB" : setBranch("CB")
    break;
    case "CSAI" : setBranch("CI")
    break;
    default : setBranch(value_branch)
  }
  setLoading(true)
  var display_tables = document.getElementById("table")
  display_tables.style.display = "initial"
}

  return (
    <>
    <h1 className="headings">
      Modify Attendance
      </h1>
      <div>
      <select id="branch">
        <option style={{display : "none"}}></option>
        <option value="0">CS</option>
        <option value="1">IT</option>
        <option value="2">CSAI</option>
        <option value="3">CSB</option>
      </select>
      <input type="date" id="date"></input>
      <button onClick={handleGet}>Get Details</button>
        </div>
    <div className="table-responsive" id="table" style={{display : "none"}}>
    <table className="table table-bordered table-hover">
  <thead className="table-dark">
    <tr>
    {/* <th>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
        </div>
      </th> */}
      <th scope="col" style={{width : "33%"}}>Student Id</th>
      <th scope="col" style={{width : "33%"}}>Name</th>
      <th scope="col" style={{width : "33%"}}>Action</th>
    </tr>
  </thead>
  <tbody>
  {  uploaded.length == 0 ? <tr><th colSpan="4" style={{textAlign : "center"}}>No Records Found...</th></tr> : uploaded.map((row) => {
    var no = "L" + row.branch + "2021"
    var present_bg = "white";
    var present_cl = "green";
    var absent_bg = "white";
    var absent_cl = "red";
    row.roll_no<10 ? no += "00" : no += "0";
    if(row.status == "p") {
      present_bg = "green"
      present_cl = "white"
    }
    else {
      absent_bg = "red"
      absent_cl = "white"
    }
      return (
      <tr key={row.roll_no}>
      {/* <td>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id={`cb${row.roll_no}`} onClick={(e) => {check(e)}}/>
        </div>
      </td> */}
      <th scope="row">{no+row.roll_no}</th>
      <td>{row.name}</td>
      <td>
        <div className="cellAction">
          <div className="presentButton" id={`p${row.roll_no}`} onClick={(e) => {color(e, 'p')}} style={{backgroundColor : `${present_bg}`, color : `${present_cl}`}}>Present</div>
          <div className="absentButton" id={`a${row.roll_no}`} onClick={(e) => {color(e, 'a')}} style={{backgroundColor : `${absent_bg}`, color : `${absent_cl}`}}>Absent</div>
        </div>
      </td>
      </tr> );
    })
  }
  </tbody>
</table>
{/* { 
  ids.map((item) => {
  return (
  <label>{item}</label> )
}) } */}
{uploaded.length != 0 ? <button onClick={handleSubmit}>Submit</button> : <div></div>
}
</div>
</>
  );
};

export default ModifyAttendance;


