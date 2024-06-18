import axios from "axios";
import React, { useEffect, useState } from "react";
// import "./Widgets.scss";
import "../../Styles/Widgets.scss";
export default function Widgets() {
  const [strength, setStrength] = useState(0);
  useEffect(() => {
    axios.post('http://localhost:8082/student/strength')
    .then(res => setStrength(res.data))
  }, [])
  return (
  <div className="widgets">
    <div className="widget">
        <span className="title">Total Students</span>
        <span className="counter">{strength}</span>
    </div>
    <div className="widget">
        <span className="title">Interested Students</span>
        <span className="counter">180</span>
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
