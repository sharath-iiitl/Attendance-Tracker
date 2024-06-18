import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
// import "./Widgets.scss";
import "../../Styles/Widgets.scss";
export default function Widgets() {
  const { mail } = useParams();
  const [strength, setStrength] = useState(0);
  useEffect(() => {
    axios.post('http://localhost:8082/student/strength')
    .then(res => setStrength(res.data))
  }, [])
  var course_no = "";
  var i = 0;
  for(i;i<mail.length;i++) {
    if(mail[i+1] == '@')
      break;
  }
  course_no += `${mail[i]}`
  return (
  <div className="widgets">
    <div className="widget">
        <span className="title">Total Classes</span>
        <span className="counter">100</span>
    </div>
    <div className="widget">
        <span className="title">Total Students</span>
        <span className="counter">{strength}</span>
    </div>
    {/* <div className="widget">
        <span className="title">Absent</span>
        <span className="counter">20</span>
    </div>
    <div className="widget">
        <span className="title">Percentage</span>
        <span className="counter">80%</span>
    </div> */}
  </div>
  );
}
