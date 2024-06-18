import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./Widgets.scss";
export default function Widgets() {
  const { mail } = useParams()
  const [isloading, setLoading] = useState(true)
  const [total_classes, setTotal] = useState(0);
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);
  const [color, setColor] = useState("");
  const branch = mail.slice(1,3).toUpperCase()
  // const batch = parseInt(mail.slice(3,7))
  const roll_no = parseInt(mail.slice(8,10))
  useEffect(() => {
    if(isloading == true) {
      try {
        console.log(branch)
        // console.log(batch)
        console.log(roll_no)
        axios.post('http://localhost:8082/student/count', { "roll_no" : `${roll_no}`, "branch" : `${branch}` })
        .then(info => setTotal(info.data))
      }
      catch (err) {
        console.log(err);
      }
      try {
        axios.post('http://localhost:8082/student/count', { "roll_no" : `${roll_no}`, "branch" : `${branch}`, "status" : "p" })
        .then(info => setPresent(info.data))
        .then(setLoading(false))
      }
      catch (err) {
        console.log(err);
      }
    }
    if(present * 100 / total_classes < 65)
      setColor("red")
    else
      setColor("green")
  }
  )
  return (
  <div className="widgets_student">
  <div>
    <div className="widget_student">
        <span className="title">Total Classes</span>
        <span className="counter">{total_classes}</span>
    </div>
    <div className="widget_student">
        <span className="title">Present</span>
        <span className="counter">{present}</span>
    </div>
    </div>
    <div>
    <div className="widget_student">
        <span className="title">Absent</span>
        <span className="counter">{total_classes - present}</span>
    </div>
    <div className="widget_student" style={{backgroundColor : `${color}`, color : "white"}}>
        <span className="title" style={{color : "white"}}>Percentage</span>
        <span className="counter">{`${(present * 100 / total_classes).toFixed(2)}%`}</span>
    </div>
    </div>
  </div>
  );
}
