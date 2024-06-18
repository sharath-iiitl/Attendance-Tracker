// import "./Datatable.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import './LeaveRequest.scss'
import { display } from "@mui/system";

const LeaveRequest = () => {
  const [requests, setRequests] = useState([]);
  const [isloading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(0);
  var count = 1;

useEffect(() => {
  async function run() {
  if (isloading == true) {
    const id = [];
  try{
    await axios.post('http://localhost:8082/request/details', { "status" : "pending" })
    .then(info => {
      console.log(info.data);
      var list = info.data;
      list.forEach(async (item) => {
        try {
          await axios.post('http://localhost:8082/student/count', { "roll_no" : `${item.roll_no}`, "branch" : `${item.branch}` })
          .then(info => {item['total'] = info.data})
        }
        catch (err) {
          console.log(err);
        }
        try {
          await axios.post('http://localhost:8082/student/count', { "roll_no" : `${item.roll_no}`, "branch" : `${item.branch}`, "status" : "p" })
          .then(info => {item['present'] = info.data});
        }
        catch (err) {
          console.log(err);
        }
      })
      
      
      console.log(list);
      setRequests(list)
      // setStudents(info.data.sort((a, b)  => {return a.id - b.id}))
    })
    .then(setLoading(false))
    }
    catch (err) {
      console.log(err);
    }
  }
}
run();
}, [submit])

// const delete_students = []

// const handleSubmit = () => {
//   // for(let i=1;i<=data.length;i++) {
//     studentslist.forEach((i) => {
//     const delete_this = document.querySelector(`#d${i.id}`);
//     if(delete_this.style.backgroundColor == "red") {
//         delete_students.push({"_id" : `${i._id}`});}
//   })

//   console.log(delete_students);
//   for(let j=0;j<delete_students.length;j++) {
//   try{
//     axios.post('http://localhost:8082/student/delete', delete_students[j])
//   }
//   catch (err) {
//     console.log(err);
//   }
// }
//   setLoading(true);
//   if(submit == 0)
//     setSubmit(1);
//   else
//     setSubmit(0);
// }

// const color = (e) => {
//     if(e.target.style.backgroundColor == "" || e.target.style.backgroundColor == "white") {
//       e.target.style.backgroundColor = "red"
//       e.target.style.color = "white"
//     }
//     else {
//       e.target.style.backgroundColor = "white"
//       e.target.style.color = "red"
//     }
// }

// const handleAdd = () => {
//   count += 1;
//   console.log(count);
//   const body = document.getElementById("tbody");
//   console.log(body.innerHTML)
//   var id = document.createElement("th")
//   var id_text = document.createElement("input")
//   id_text.placeholder = "Student Id"
//   id_text.id = `sid${count}`
//   id.appendChild(id_text);
//   var name = document.createElement("td");
//   var name_text = document.createElement("input")
//   name_text.placeholder = "Student Name"
//   name_text.id = `sname${count}`
//   name.appendChild(name_text);
//   var row = document.createElement("tr")
//   row.appendChild(id)
//   row.appendChild(name)
//   body.appendChild(row)
// }

// const handleGet = () => {
//   var branch = document.getElementById("branch")
//   const value_branch = branch.options[branch.selectedIndex].innerText
//   switch(value_branch) {
//     case "CSB" : setBranch("CB")
//     break;
//     case "CSAI" : setBranch("CI")
//     break;
//     default : setBranch(value_branch)
//   }
//   setLoading(true)
//   var display_tables = document.getElementById("tables")
//   display_tables.style.display = "initial"
// }

const color = (e, status) => {
  if(status == 'a') {
    const id = 'reject' + e.target.id.slice(6);
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
    const id = 'accept' + e.target.id.slice(6);
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

const accept = [];
const reject = [];
const send_data = [];

const handleSubmit = () => {
  // for(let i=1;i<=data.length;i++) {
    requests.forEach((i) => {
    const inserta = document.querySelector(`#accept${i._id}`);
    if(inserta.style.backgroundColor == "green") {
      accept.push(i._id); }
    const insertr = document.querySelector(`#reject${i._id}`);
    if(insertr.style.backgroundColor == "red") {
      reject.push(i._id); }
  })
  console.log(accept);
  console.log(reject);
  // var filtereda = requests.filter((row) => {return accept.indexOf(row._id) !== -1})
  // console.log(filteredp);
  // var filteredr = requests.filter((row) => {return reject.indexOf(row.id) !== -1})
  // console.log(filtereda);
  // accept.forEach((item) => {
  //   const individual = {
  //     "name" : item.name,
  //     "branch" : item.branch,
  //     "roll_no" : item.id,
  //     "course_name" : `Course${course_no}`,
  //     "date" : `${date}`,
  //     "status" : "p"
  //   }
  //   send_data.push(individual);
  // })

  // reject.forEach((item) => {
  //   const individual = {
  //     "name" : item.name,
  //     "branch" : item.branch,
  //     "roll_no" : item.id,
  //     "course_name" : `Course${course_no}`,
  //     "date" : `${date}`,
  //     "status" : "a"
  //   }
  //   send_data.push(individual);
  // })
  accept.forEach((item) => {
    const individual = {
      "status" : "accepted",
      "_id" : item
    }
    send_data.push(individual);
  })

  reject.forEach((item) => {
    const individual = {
      "status" : "rejected",
      "_id" : item
    }
    send_data.push(individual);
  })

  // const mark_students = { "data" : send_data }
  // console.log(mark_students);
  // try{
  //   axios.post('http://localhost:8082/attendance/mark_students', mark_students);
  //   alert("Successfully uploaded " + send_data.length + " records");
  // }
  // catch (err) {
  //   console.log(err);
  // }
  for(let j=0;j<send_data.length;j++) {
    try{
      axios.put('http://localhost:8082/request/update', send_data[j])
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
        {/* <div>
        Modify Students
      </div> */}

      <h1 className="headings">
      Leave Request
      </h1>
      <div className="requests">
        {/* <select id="branch">
        <option style={{display : "none"}}></option>
        <option value="0">CS</option>
        <option value="1">IT</option>
        <option value="2">CSAI</option>
        <option value="3">CSB</option>
      </select> */}
      { requests.map((item) => {
        const start_date = new Date(item.start_date);
        const end_date = new Date(item.end_date);
        const days = (end_date - start_date) / (1000 * 3600 * 24);
        {/* const [total, setTotal] = useState(0);
        const [present, setPresent] = useState(0); */}
        {/* if(load == true) { */}
        {/* try {
        axios.post('http://localhost:8082/student/count', { "roll_no" : `${item.roll_no}`, "branch" : `${item.branch}` })
        .then(info => {total = info.data})
        .then(info => setTotal(info.data))
      } */}
      {/* catch (err) {
        console.log(err);
      }
      try {
        axios.post('http://localhost:8082/student/count', { "roll_no" : `${item.roll_no}`, "branch" : `${item.branch}`, "status" : "p" })
        .then(info => {present = info.data}); */}
        {/* .then(info => {setPresent(info.data); */}
        {/* if(requests.indexOf(item) == count - 1)
          setLoad(false);}) */}
      {/* }
      catch (err) {
        console.log(err);
      }
      } */}
      {/* try {
        axios.post('http://localhost:8082/student/count', { "roll_no" : `${item.roll_no}`, "branch" : `${item.branch}`, "status" : "p" })
        .then(info => console.log(info.data))
      }
      catch (err) {
        console.log(err);
      } */}
        return (
        <div key={count} id={`request${count}`}>
        {/* <span>{console.log(item)}</span> */}
        <div style={{display : "flex", flexWrap : "wrap"}}>
        <div style={{marginRight : "45px"}}>
        <span className="title">Name</span> <br />
        <span className="counter" style={{fontSize : "20px"}}>{item.name}</span>
        </div>
        <div style={{marginRight : "45px"}}>
        <span className="title">Branch</span> <br />
        <span className="counter" style={{fontSize : "20px"}}>{item.branch}</span>
        </div>
        <div style={{marginRight : "45px"}}>
        <span className="title">Roll No</span> <br />
        <span className="counter" style={{fontSize : "20px"}}>{item.roll_no}</span>
        </div>
        <div style={{marginRight : "45px"}}>
        <span className="title">Start Date</span> <br />
        <span className="counter" style={{fontSize : "20px"}}>{item.start_date}</span>
        </div>
        <div style={{marginRight : "45px"}}>
        <span className="title">End Date</span> <br />
        <span className="counter" style={{fontSize : "20px"}}>{item.end_date}</span>
        </div>
        <div style={{marginRight : "45px"}}>
        <span className="title">No.of Days</span> <br />
        <span className="counter" style={{fontSize : "20px"}}>{days + 1}</span>
        </div>
        {/* <span className="title">Name</span>
        <span className="counter" style={{fontSize : "20px"}}>{item.name}</span> */}
        {/* <span>Name - {item.name}</span>
        <span>Branch - {item.branch}</span>
        <span>Roll No - {item.roll_no}</span>
        <span>Start Date - {item.start_date}</span>
        <span>End Date - {item.end_date}</span>
        <span>No.of Days - {days + 1}</span>
        <span>P - {item.present}</span>
        <span>T - {item.total}</span>
        <span>Attendance - {(item.present * 100) / item.total}</span> */}
        </div>
        <h1>{item.reason}</h1>
        <label>{item.desc}</label>
        <div className="leavebuttons">
          <button className="acceptButton" id={`accept${item._id}`} onClick={(e) => {color(e, 'a')}}>Accept</button>
          <button className="rejectButton" id={`reject${item._id}`} onClick={(e) => {color(e, 'r')}}>Reject</button>
        </div>
        <label style={{display : "none"}}>
        {count++}
        </label>
        </div>
      )
      })
      }
      </div>
      <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
    
  );
};

export default LeaveRequest;


