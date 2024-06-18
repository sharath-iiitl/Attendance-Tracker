import "./Datatable.scss";
// import { checkGridRowIdIsValid, DataGrid, GridLoadingOverlay, selectedIdsLookupSelector } from "@mui/x-data-grid";
// import { userColumns } from "../../Datatablesource";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const MarkAttendance = () => {
  const { mail } = useParams();
  const [uploaded, setUploaded] = useState([]);
  const [isloading, setLoading] = useState(false);
  const [studentslist, setStudents] = useState([]);
  const [date,setDate] = useState("");
  const [data,setData] = useState([]);
  const [ids, setIds] = useState([]);
  const [submit, setSubmit] = useState(0);
  const [branch, setBranch] = useState("");
// const getdata = async () => {
//   await fetch('http://localhost:8082/attendance/get_students')
//     .then(res => res.json())
//     .then(info => {
//       info.forEach(element => {
//       studentslist.push(element);
//     });})
//     setData(studentslist);
//   }

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
    await axios.post('http://localhost:8082/attendance/get_attendance', { "date" : `${date}`, "branch" : `${branch}`, "course_name" : `Course${course_no}`})
    .then(info => {
      console.log(info.data)
      setUploaded(info.data)
      info.data.forEach((obj) => {id.push(obj.roll_no)})
      setIds(id);
    })
    // .then(
    //   uploaded.forEach(item => {ids.push(item.name)})
    //   // console.log(ids)
    // )
    .then(setLoading(false))
  } catch (error) {
    console.log(error);
  }
  try{
    await axios.post('http://localhost:8082/attendance/get_students', {"branch" : `${branch}`})
    .then(info => {
      console.log(info.data)
      setStudents(info.data.sort((a, b)  => {return a.id - b.id}))
      var list = info.data.filter((item) => {
        if(id.indexOf(item.id) === -1)
          return true
        else
          return false
  })
  setData(list);
    })
    // .then(setLoading(false))
    }
    catch (err) {
      console.log(err);
    }
  // console.log(uploaded);
  // const ids = uploaded.forEach((item) => {return item.id})
  // console.log(ids);
  // data = studentslist.filter((item) => {return uploaded.indexOf()})
  }
  }
  run();
  console.log("Run")
  // var list = studentslist.filter((item) => {
  //       if(ids.indexOf(item.id) === -1)
  //         return true
  //       else
  //         return false
  // })
  // setData(list);
  // console.log("Change occurred");
}, [submit, branch, date])


// getdata();

const present = [];
const absent = [];
const send_data = [];

const handleSubmit = () => {
  // for(let i=1;i<=data.length;i++) {
    data.forEach((i) => {
    const insertp = document.querySelector(`#p${i.id}`);
    if(insertp.style.backgroundColor == "green") {
      present.push(i.id); }
    const inserta = document.querySelector(`#a${i.id}`);
    if(inserta.style.backgroundColor == "red") {
      absent.push(i.id); }
  })
  console.log(present);
  var filteredp = data.filter((row) => {return present.indexOf(row.id) !== -1})
  console.log(filteredp);
  var filtereda = data.filter((row) => {return absent.indexOf(row.id) !== -1})
  console.log(filtereda);
  filteredp.forEach((item) => {
    const individual = {
      "name" : item.name,
      "branch" : item.branch,
      "roll_no" : item.id,
      "course_name" : `Course${course_no}`,
      "date" : `${date}`,
      "status" : "p"
    }
    send_data.push(individual);
  })

  filtereda.forEach((item) => {
    const individual = {
      "name" : item.name,
      "branch" : item.branch,
      "roll_no" : item.id,
      "course_name" : `Course${course_no}`,
      "date" : `${date}`,
      "status" : "a"
    }
    send_data.push(individual);
  })

  const mark_students = { "data" : send_data }
  console.log(mark_students);
  try{
    axios.post('http://localhost:8082/attendance/mark_students', mark_students);
    alert("Successfully uploaded " + send_data.length + " records");
  }
  catch (err) {
    console.log(err);
  }
  setLoading(true);
  if(submit == 0)
    setSubmit(1);
  else
    setSubmit(0);
}

// const handleCheckbox = () => {
//   const main_checkbox = document.getElementById("main_checkbox");
//   const value = main_checkbox.checked
//   data.forEach((item) => {
//     const checkbox = document.getElementById(`cb${item.id}`)
//     checkbox
//   })
// }

const color = (e, status) => {
  if(status == 'p') {
    const id = 'a' + e.target.id.slice(1);
    const a = document.getElementById(id);
    if(a.style.backgroundColor == "red") {
      a.style.backgroundColor = "white";
      a.style.color = "red";
    }
  if (e.target.style.backgroundColor == "" || e.target.style.backgroundColor == "white") {
  e.target.style.backgroundColor = "green"
  e.target.style.color = "white" }
  else if (e.target.style.backgroundColor == "green") {
    e.target.style.backgroundColor = "white"
    e.target.style.color = "green" }
}
  else {
    const id = 'p' + e.target.id.slice(1);
    const p = document.getElementById(id);
    if(p.style.backgroundColor == "green") {
      p.style.backgroundColor = "white";
      p.style.color = "green";
    }
    if (e.target.style.backgroundColor == "" || e.target.style.backgroundColor == "white") {
      e.target.style.backgroundColor = "red"
      e.target.style.color = "white" }
    else if (e.target.style.backgroundColor == "red") {
        e.target.style.backgroundColor = "white"
        e.target.style.color = "red" }
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
  var display_tables = document.getElementById("tables")
  display_tables.style.display = "initial"
}

  return (
    <>
    <h1 className="headings">
      Mark Attendance
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
        <div id="tables" style={{display : "none"}}>
    <div className="table-responsive">
    <table className="table table-bordered table-hover">
  <thead className="table-dark">
    <tr>
    {/* <th>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="main_checkbox" />
        </div>
      </th> */}
      <th scope="col" style={{width : "33%"}}>Student Id</th>
      <th scope="col" style={{width : "33%"}}>Name</th>
      <th scope="col" style={{width : "33%"}}>Action</th>
    </tr>
  </thead>
  <tbody>
  {  isloading ? <tr><th>Loading...</th></tr> : data.map((row) => {
    var no = "L" + row.branch + "2021"
    row.id<10 ? no += "00" : no += "0";
      return (
      <tr key={row.id}>
      {/* <td>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id={`cb${row.id}`} onClick={(e) => {check(e)}}/>
        </div>
      </td> */}
      <th scope="row">{no+row.id}</th>
      <td>{row.name}</td>
      <td>
        <div className="cellAction">
          <div className="presentButton" id={`p${row.id}`} onClick={(e) => {color(e, 'p')}}>Present</div>
          <div className="absentButton" id={`a${row.id}`} onClick={(e) => {color(e, 'a')}}>Absent</div>
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
</div>
<button onClick={handleSubmit}>Submit</button>
</div>
</>
  );
};

export default MarkAttendance;


