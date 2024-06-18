import { useContext, useEffect, useState } from "react";
import "./write.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
// import Header from "../../components/header(write)/Header";
import axios from "axios";
import { useParams } from "react-router";
// import { Context } from "../../context/Context";

export default function Write() {
  const { mail } = useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  // const [name, setName] = useState("");
  const [isloading, setLoading] = useState(true);
  const [submit, setSubmit] = useState(0);
  const [uploaded, setUploaded] = useState([]);
  const branch = mail.slice(1,3).toUpperCase()
  // // const batch = parseInt(mail.slice(3,7))
  const roll_no = parseInt(mail.slice(8,10))
  const name = `Student${roll_no}`
  // const { user } = useContext(Context);

  useEffect(() => {
    async function run() {
    if(isloading == true) {
      try {
        await axios.post('http://localhost:8082/request/details', {"branch" : `${branch}`, "roll_no" : `${roll_no}`})
        .then(info => setUploaded(info.data))
        .then(setLoading(false))
      }
      catch (err) {
        console.log(err);
      }
    }
  }
  run();
  }, [submit])

  const handleSubmit = async (e) => {
    e.preventDefault();
    var startdate = document.getElementById("start_date").value;
    var enddate = document.getElementById("end_date").value;
    // try {
    //   await axios.post('http://localhost:8082/attendance/get_students', {"branch" : `${branch}`, "id" : `${roll_no}`})
    //   .then(res => setName(res.data[0].name))
    // }
    // catch (err) {
    //   console.log(err);
    // }
    var post = {
      "name" : name,
      "branch" : branch,
      "roll_no" : roll_no,
      "status" : "pending",
      "reason" : title,
      "desc" : desc,
      "start_date" : startdate,
      "end_date" : enddate,      
    }
    try {
      console.log(post);
      const res = await axios.post('http://localhost:8082/request/post', post)
      .then(res => alert(res.data))
      // window.location.replace("/post/" + res.data._id);
    }
    catch (err) {
      console.log(err);
    }
    // startdate = "";
    // enddate = "";
    // setTitle("");
    // setDesc("");
    setLoading(true);
  if(submit == 0)
    setSubmit(1);
  else
    setSubmit(0);
  };
  return (
//     <div className='list'>
//       <Sidebar/>
//       <div className='listContainer'>
//         <Navbar/>
//     <div className="write">
//       {/* {file && (
//         <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
//       )} */}
//       <form className="writeForm" onSubmit={handleSubmit}>
//       <input type="date" id="start_date"></input>
//       <input type="date" id="end_date"></input>
//         <div className="writeFormGroup">
//           {/* <label htmlFor="fileInput">
//             <i className="writeIcon fas fa-plus"></i>
//           </label>
//           <input
//             type="file"
//             id="fileInput"
//             style={{ display: "none" }}
//             onChange={(e) => setFile(e.target.files[0])}
//           /> */}
//           <input
//             type="text"
//             // value={title}
//             placeholder="Main Reason for Leave"
//             className="writeInput"
//             autoFocus={true}
//             onChange={e=>setTitle(e.target.value)}
//           />
//         </div>
//         <div className="writeFormGroup">
//           <textarea
//             placeholder="Report Your Concern..."
//             type="text"
//             // value={desc}
//             className="writeInput writeText"
//             onChange={e=>setDesc(e.target.value)}
//           ></textarea>
//         </div>
//         <button className="writeSubmit" type="submit">
//           Send Request
//         </button>
//     <div className="table-responsive" id="table">
//     <table className="table table-bordered table-striped">
//   <thead className="table-dark">
//     <tr>
//       <th scope="col">Reason</th>
//       <th scope="col">Start Date</th>
//       <th scope="col">End Date</th>
//       <th scope="col">Status</th>
//     </tr>
//   </thead>
//   <tbody>
//   {  uploaded.length == 0 ? <tr><th colSpan="4" style={{textAlign : "center"}}>No Records Found...</th></tr> : uploaded.map((row) => {
//       return (
//       <tr key={row._id}>
//       <th scope="row">{row.reason}</th>
//       <td>{row.start_date}</td>
//       <td>{row.end_date}</td>
//       <td>
//         <div className="cellAction">
//         {
//           row.status == 'pending'
//         ? <div className="presentButton"style={{backgroundColor : "powderblue", color : "black"}}>Pending</div>
//         : (row.status == 'accepted'
//         ?  <div className="presentButton"style={{backgroundColor : "green", color : "white"}}>Accepted</div>
//         : <div className="absentButton"style={{backgroundColor : "red", color : "white"}}>Rejected</div> )
//         }
//         </div>
//       </td>
//       </tr> );
//     })
//   }
//   </tbody>
// </table>
// </div>
// </form>
// </div>
// </div>
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

          

          <div className="write">
      <h1 className="headings">
      Leave Request
      </h1>
      <form className="writeForm" onSubmit={handleSubmit}>
      <input type="date" id="start_date"></input>
      <input type="date" id="end_date"></input>
        <div className="writeFormGroup">
          {/* <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          /> */}
          <input
            type="text"
            // value={title}
            placeholder="Main Reason for Leave"
            className="writeInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Report Your Concern..."
            type="text"
            // value={desc}
            className="writeInput writeText"
            onChange={e=>setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Send Request
        </button>
    <div className="table-responsive" id="table">
    <table className="table table-bordered table-striped">
  <thead className="table-dark">
    <tr>
      <th scope="col">Reason</th>
      <th scope="col">Start Date</th>
      <th scope="col">End Date</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
  {  uploaded.length == 0 ? <tr><th colSpan="4" style={{textAlign : "center"}}>No Records Found...</th></tr> : uploaded.map((row) => {
      return (
      <tr key={row._id}>
      <th scope="row">{row.reason}</th>
      <td>{row.start_date}</td>
      <td>{row.end_date}</td>
      <td>
        <div className="cellAction">
        {
          row.status == 'pending'
        ? <div className="presentButton"style={{backgroundColor : "powderblue", color : "black"}}>Pending</div>
        : (row.status == 'accepted'
        ?  <div className="presentButton"style={{backgroundColor : "green", color : "white"}}>Accepted</div>
        : <div className="absentButton"style={{backgroundColor : "red", color : "white"}}>Rejected</div> )
        }
        </div>
      </td>
      </tr> );
    })
  }
  </tbody>
</table>
</div>
</form>
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
  );
}
