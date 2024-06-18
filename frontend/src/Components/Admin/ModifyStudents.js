// import "./Datatable.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { display } from "@mui/system";

const ModifyStudents = () => {
  const [uploaded, setUploaded] = useState([]);
  const [isloading, setLoading] = useState(false);
  const [studentslist, setStudents] = useState([]);
  const [ids, setIds] = useState([]);
  const [submit, setSubmit] = useState(0);
  const [branch, setBranch] = useState("");
  var count = 1;

useEffect(() => {
  async function run() {
  if (isloading == true) {
    const id = [];
  try{
    await axios.post('http://localhost:8082/attendance/get_students', { "branch" : `${branch}` })
    .then(info => {
      // console.log(info.data)
      setStudents(info.data.sort((a, b)  => {return a.id - b.id}))
    })
    .then(setLoading(false))
    }
    catch (err) {
      console.log(err);
    }
  }
}
run();
}, [submit, branch])

const delete_students = []

const handleSubmit = () => {
  // for(let i=1;i<=data.length;i++) {
    studentslist.forEach((i) => {
    const delete_this = document.querySelector(`#d${i.id}`);
    if(delete_this.style.backgroundColor == "red") {
        delete_students.push({"_id" : `${i._id}`});}
  })

  console.log(delete_students);
  for(let j=0;j<delete_students.length;j++) {
  try{
    axios.post('http://localhost:8082/student/delete', delete_students[j])
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

const color = (e) => {
    if(e.target.style.backgroundColor == "" || e.target.style.backgroundColor == "white") {
      e.target.style.backgroundColor = "red"
      e.target.style.color = "white"
    }
    else {
      e.target.style.backgroundColor = "white"
      e.target.style.color = "red"
    }
}

const handleAdd = () => {
  count += 1;
  console.log(count);
  const body = document.getElementById("tbody");
  console.log(body.innerHTML)
  var id = document.createElement("th")
  var id_text = document.createElement("input")
  id_text.placeholder = "Student Id"
  id_text.id = `sid${count}`
  id.appendChild(id_text);
  var name = document.createElement("td");
  var name_text = document.createElement("input")
  name_text.placeholder = "Student Name"
  name_text.id = `sname${count}`
  name.appendChild(name_text);
  var row = document.createElement("tr")
  row.appendChild(id)
  row.appendChild(name)
  body.appendChild(row)
}

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
  var display_tables = document.getElementById("tables")
  display_tables.style.display = "initial"
}

  return (
    <>
    <h1 className="headings">
      Modify Students
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
        <div id="tables" style={{display : "none"}}>
        {/* <div className="table-responsive" >
    <table className="table">
  <thead>
    <tr> */}
    {/* <th>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
        </div>
      </th> */}
      {/* <th scope="col">Student Id</th>
      <th scope="col">Name</th> */}
      {/* <th scope="col">Action</th> */}
    {/* </tr>
  </thead>
  <tbody id="tbody">
      <tr>
      <th><input placeholder="Student Id" id="sid1"/></th>
      <th><input placeholder="Student Name" id="sname1"/></th>
      </tr>
  </tbody>
</table>
<button onClick={handleAdd}>Add</button>
</div> */}
    <div className="table-responsive">
    <table className="table">
  <thead>
    <tr>
    {/* <th>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
        </div>
      </th> */}
      <th scope="col">Student Id</th>
      <th scope="col">Name</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {  studentslist.length == 0 ? <tr><th></th><td>No Records Found...</td><td></td></tr> : studentslist.map((row) => {
    var no = "L" + row.branch + "2021"
    row.id<10 ? no += "00" : no += "0";
      return (
      <tr key={row.id}>
      {/* <td>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id={`cb${row.id}`}/>
        </div>
      </td> */}
      <th scope="row">{no+row.id}</th>
      <td>{row.name}</td>
      <td>
        <div className="cellAction">
          <div className="absentButton" id={`d${row.id}`} onClick={(e) => {color(e)}}>Remove</div>
        </div>
      </td>
      </tr> );
    })
  }
  </tbody>
</table>
</div>
</div>
<button onClick={handleSubmit}>Submit</button>
</>
  );
};

export default ModifyStudents;


