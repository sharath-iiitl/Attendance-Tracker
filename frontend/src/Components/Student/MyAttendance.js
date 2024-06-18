import "./Datatable.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const MyAttendance = () => {
  const { mail } = useParams();
  const [uploaded, setUploaded] = useState([]);
  const [isloading, setLoading] = useState(false);
  const [date,setDate] = useState("");
  const branch = mail.slice(1,3).toUpperCase()
  const roll_no = parseInt(mail.slice(8,10))

useEffect(() => {
  async function run() {
  if (isloading == true) {
  try {
    await axios.post('http://localhost:8082/attendance/get_attendance', { "date" : `${date}`, "roll_no" : `${roll_no}`, "branch" : `${branch}`})
    .then(info => {
      setUploaded(info.data.sort((a, b)  => {return a.roll_no - b.roll_no}))
      console.log(info.data);
    })
    .then(setLoading(false))
  } catch (error) {
    console.log(error);
  }
  }
  }
  run();
}, [branch, date])

const handleGet = () => {
  var date = document.getElementById("date")
  const value_date = date.value
  setDate(value_date);
  setLoading(true)
  var display_tables = document.getElementById("table")
  display_tables.style.display = "initial"
}

  return (
    <>
    <h1 className="headings">
      Attendance
      </h1>
      <div>
      <input type="date" id="date"></input>
      <button onClick={handleGet}>Get Details</button>
        </div>
    <div className="table-responsive" id="table" style={{display : "none"}}>
    <table className="table table-bordered table-striped">
  <thead className="table-dark">
    <tr>
      <th scope="col" style={{width : "33%"}}>Date</th>
      <th scope="col" style={{width : "33%"}}>Course Name</th>
      <th scope="col" style={{width : "33%"}}>Status</th>
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
</>
  );
};

export default MyAttendance;


