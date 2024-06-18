import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.scss";
import photo from './LecturerLogin.png'
export var mail = ""


export default function Login_Lecturer() {
  const role = "Lecturer"
  const [mail, setMail] = useState("")
  const setmail = () => {
      const input = document.getElementById("mail")
      setMail(input.value);
      // console.log(input.value);
  }

  // const [email, setEmail] = React.useState("");
  const [password, setPassword] = useState("");
  
  const style={
    fontWeight: 'bold',
    fontSize: 18
  }

  async function loginTheStudent(event) {
    event.preventDefault();
    axios.post('http://localhost:8082/user/get_user', { "mail" : `${mail}`, "password" : `${password}`})
    .then(info => {
      console.log(role);
        const contentBox = document.querySelector(".errorBox");
        if (info.data.user) {
          console.log(info.data.user)
          if(role != info.data.role) {
            contentBox.innerHTML = `<div className=error-div id="div" style="
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            border: 1px solid red;
            color: red;
            border-radius: 2px;
            min-height:50px;
            min-width:330px;
          " >
          <span class="material-symbols-outlined">
    error
    </span> You are ${info.data.role}, Please login through ${info.data.role}'s Portal 
          </div>`
          setTimeout(() => {
            var div = document.getElementById("div")
            div.style.display = "none"
          }, 5000);
          }
          else {
          alert("Login Sucessful");
          const lecturer = localStorage.getItem('lecturer');
          if(lecturer == undefined)
            localStorage.setItem('lecturer', JSON.stringify(false));
          localStorage.setItem('lecturer', JSON.stringify(true));
          window.location.href = `/Lecturer/${mail}`; }
        } else {
            contentBox.innerHTML = `<div className=error-div id="div" style="
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            border: 1px solid red;
            color: red;
            border-radius: 2px;
            min-height:50px;
            min-width:330px;
          " >
          <span class="material-symbols-outlined">
    error
    </span> Incorrect email or password
          </div>`
          setTimeout(() => {
            var div = document.getElementById("div")
            div.style.display = "none"
          }, 5000);
          }
        });
    
  }
  return (
    // <>
    //   <form onSubmit={loginTheStudent}>
    //     <div className="outBox">
    //       <div className="content">
    //         <label className="errorBox"></label>
    //         <h2>Students Login Portal</h2>
    //         <table>
    //           <tbody>
    //             <tr>
    //               <td>
    //                 <label>Email id:</label>
    //               </td>
    //               <td>
    //                 <div className="col-sm">
    //                   <input
    //                     type="email"
    //                     className="form-control"
    //                     id="mail" onChange={setmail}
    //                   />
    //                 </div>
    //               </td>
    //             </tr>
    //             <tr>
    //               <td>
    //                 <label>Current Password - </label>
    //               </td>
    //               <td>
    //                 <div className="col-sm">
    //                   <input
    //                     value={password}
    //                     type="password"
    //                     className="form-control"
    //                     id="inputPassword3"
    //                     onChange={(e) => setPassword(e.target.value)}
    //                   />
    //                 </div>
    //               </td>
    //             </tr>
    //           </tbody>
    //         </table>
    //           <div className="d-grid col-9">
    //           <input className="btn btn-primary" type="submit" value="Login" style={style}></input>
    //         </div>
    //       </div>
    //     </div>
    //   </form>
    // </>

    <>
    {/* <div className="top_login">
      <span id="title">Attendance Tracker</span>
    </div> */}
    {/* <h1>Attendance-tracker</h1>
      
      <button >
      <Link to="/Login" >Students</Link>
      </button>
      <button >
      <Link to="/Login_A">Admin</Link>
      </button>
      <button >
      <Link to="/Login_t">Teachers</Link>
      </button> */}
      <div className="login">
        <div className="login_left">
        <span id="sideTitle">Welcome Back!</span>
        <form onSubmit={loginTheStudent}>
        <div className="outBox">
          <div className="content">
            <label className="errorBox"></label>
            <table>
              <tbody>
                <tr>
                  <td>
                    <label className="login_title" style={{margin : "20px"}}>Mail : </label>
                  </td>
                  <td>
                    <div className="col-sm">
                      <input
                        type="email"
                        className="form-control"
                        id="mail" onChange={setmail}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="login_title" style={{margin : "20px"}}>Password : </label>
                  </td>
                  <td>
                    <div className="col-sm">
                      <input
                        value={password}
                        type="password"
                        className="form-control"
                        id="inputPassword3"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
              <div className="d-grid col-9">
              <input className="btn" type="submit" value="Login" style={style}></input>
            </div>
          </div>
        </div>
      </form>
        </div>
        <div className="login_right">
        <span id="title">Lecturer's Login</span>
          <img src={photo} id="photo_login"/>
  </div>
      </div>
    </>
  );
}
