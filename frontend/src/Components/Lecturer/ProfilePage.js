import React from "react";
import { useParams } from "react-router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function ProfilePage() {
  const { mail } = useParams();
  const [password, setPassword] = React.useState("");
  const [newPassword, setnewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  // const [name,setname]=React.useState("Student Name");
  var course_no = "";
  var i = 0;
  for(i;i<mail.length;i++) {
    if(mail[i+1] == '@')
      break;
  }
course_no += `${mail[i]}`
  const [role,setRole]=React.useState("Student")
  async function handleSubmit(event) {
    event.preventDefault();

    fetch("http://localhost:8082/api/patch", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mail,
        password,
        newPassword,
        confirmPassword,
      }),
    })
      .then((response) => {
        const data2 = response.json();
        return data2;
      })
      .then((res) => {
        console.log(res.user);
        if(res.user == "errorConfirm"){
          alert("Check confirmPassword");
        }
        else if (res.user) {
          alert("Updated Sucessful");
          window.location.href = `/Student/${mail}`;
        } 
        else {
          const contentBox = document.getElementById("sectionItem");
          contentBox.innerHTML = `<div className=error-div id="sectionId" style="
              display: flex;
              align-items: center;
              justify-content: space-evenly;
              border: 1px solid red;
              color: red;
              border-radius: 2px;
              min-height:50px;
              min-width:330px;
              margin:10px;
            " >
            <span class="material-symbols-outlined">
            error
            </span> Incorrect  Password 
            </div>`;
          setTimeout(() => {
            var div = document.getElementById("sectionId");
            div.style.display = "none";
          }, 3000);
        }
      });
  }
  return (
    // <>
    //   <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
    //     <div className="container py-5 h-100">
    //       <div className="row d-flex justify-content-center align-items-center h-100">
    //         <div className="col col-lg-6 mb-4 mb-lg-0">
    //           <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
    //             <div className="row g-0">
    //               <div
    //                 className="col-md-4 gradient-custom text-center text-white"
    //                 style={{
    //                   borderTopLeftRadius: "0.5rem",
    //                   borderBottomLeftRadius: "0.5rem",
    //                   background:
    //                     "linear-gradient(to right bottom, rgba(246, 211, 101, 1), rgba(253, 160, 133, 1))",
    //                 }}
    //               >
    //                 <img
    //                   src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
    //                   alt="Avatar"
    //                   className="img-fluid my-5"
    //                   style={{ width: "150px" }}
    //                 />
    //                 <h5>{name}</h5>
    //                 <p>{role}</p>
    //                 <i className="far fa-edit mb-5"></i>
    //               </div>
    //               <div className="col-md-8">
    //                 <div className="card-body p-4">
    //                   <div className="col-sm">
    //                     <section id="sectionItem"></section>
    //                     <label>Current Password - </label>
    //                     <input
    //                       value={password}
    //                       type="password"
    //                       className="form-control"
    //                       onChange={(e) => {
    //                         return setPassword(e.target.value);
    //                       }}
    //                     />
    //                   </div>
    //                   <br></br>
    //                   <div className="col-sm">
    //                     <label>New Password - </label>
    //                     <input
    //                       value={newPassword}
    //                       type="password"
    //                       className="form-control"
    //                       onChange={(e) => {
    //                         return setnewPassword(e.target.value);
    //                       }}
    //                     />
    //                   </div>
    //                   <br></br>
    //                   <div className="col-sm">
    //                     <label>Confirm Password - </label>
    //                     <input
    //                       value={confirmPassword}
    //                       type="password"
    //                       className="form-control"
    //                       onChange={(e) => {
    //                         return setConfirmPassword(e.target.value);
    //                       }}
    //                     />
    //                   </div>
    //                   <br />
    //                   <div className="d-grid col-12">
    //                     <input
    //                       className="btn btn-primary"
    //                       type="submit"
    //                       value="Submit"
    //                       onClick={handleSubmit}
    //                     ></input>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </>

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

          <section className="vh-100" >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-6 mb-4 mb-lg-0">
              <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                <div className="row g-0">
                  <div
                    className="col-md-4 gradient-custom text-center text-white"
                    style={{
                      borderTopLeftRadius: "0.5rem",
                      borderBottomLeftRadius: "0.5rem",
                      background :
                      "linear-gradient(to right bottom, rgba(246, 211, 101, 1), rgba(253, 160, 133, 1))",                       
                    }}
                  >
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                      alt="Avatar"
                      className="img-fluid my-5"
                      style={{ width: "150px" }}
                    />
                    <h5>{`Lecturer${course_no}`}</h5>
                    {/* <p>{role}</p> */}
                    <i className="far fa-edit mb-5"></i>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <div className="col-sm">
                        <section id="sectionItem"></section>
                        <label>Current Password - </label>
                        <input
                          value={password}
                          type="password"
                          className="form-control"
                          onChange={(e) => {
                            return setPassword(e.target.value);
                          }}
                        />
                      </div>
                      <br></br>
                      <div className="col-sm">
                        <label>New Password - </label>
                        <input
                          value={newPassword}
                          type="password"
                          className="form-control"
                          onChange={(e) => {
                            return setnewPassword(e.target.value);
                          }}
                        />
                      </div>
                      <br></br>
                      <div className="col-sm">
                        <label>Confirm Password - </label>
                        <input
                          value={confirmPassword}
                          type="password"
                          className="form-control"
                          onChange={(e) => {
                            return setConfirmPassword(e.target.value);
                          }}
                        />
                      </div>
                      <br />
                      <div className="d-grid col-12">
                        <input
                          className="btn btn-primary"
                          type="submit"
                          value="Submit"
                          onClick={handleSubmit}
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
