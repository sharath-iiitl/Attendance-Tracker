import React, { useEffect, useState } from "react";
import "./Featured.scss";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
export default function Featured() {
  // const { mail } = useParams();
  const [isloading, setLoading] = useState(true);
  // const [details, setDetails] = useState([]);
  const [count, setCount] = useState(0);
  const [date, setDate] = useState("");
  const [total_classes, setTotal] = useState(0);
  const [present, setPresent] = useState(0);
  // const branch = mail.slice(1,3).toUpperCase()
  // const batch = parseInt(mail.slice(3,7))
  // const roll_no = parseInt(mail.slice(8,10))
//   var course_no = "";
//   var i = 0;
//   for(i;i<mail.length;i++) {
//     if(mail[i+1] == '@')
//       break;
//   }
// course_no += `${mail[i]}`

  useEffect(() => {
    if(isloading == true) {
      try {
      axios.post('http://localhost:8082/student/details')
      .then(info => {console.log(info.data); return info.data})
      .then(data => {
        var count = 0;
        data.forEach((item) => {
          if(item.date == data[data.length - 1].date)
            count++
        })
        setCount(count);
        const latest_date = new Date(data[data.length - 1].date)
        setDate(latest_date.toString())
        try {
          axios.post('http://localhost:8082/student/count', { date : data[data.length - 1].date })
          .then(info => setTotal(info.data))
        }
        catch (err) {
          console.log(err);
        }
        try {
          axios.post('http://localhost:8082/student/count', { status : "p", date : data[data.length - 1].date})
          .then(info => setPresent(info.data))
        }
        catch (err) {
          console.log(err);
        }
      })
      .then(setLoading(false))
      }
      catch (err) {
        console.log(err);
      }
      
    }
  }
  )
  return (
    <div className="featured">
      <div className="top">
        <h1>Attendance</h1>
        <label>{date.slice(4, 10)}</label>
        {/* <span className="material-symbols-outlined">more_vert</span> */}
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={present * 100 / total_classes} text={`${(present * 100 / total_classes).toFixed(2)}%`} strokeWidth={6} />
        </div>
        <p className="title">Total students attended</p>
        <p className="amount">{`${present} / ${total_classes}`}</p>
        {/* <p className="desc"> Previous data </p> */}
        <div className="summary">
          {/* <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
            <span className="material-symbols-outlined">expand_more</span>
              <div className="resultAmount">13</div>
            </div>
          </div> */}
          {/* <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
            <span className="material-symbols-outlined">expand_less</span>
              <div className="resultAmount">15</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
            <span className="material-symbols-outlined">expand_less</span>
              <div className="resultAmount">17</div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
