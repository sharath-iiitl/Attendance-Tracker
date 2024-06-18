import Student from "./Pages/Student";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./Styles/Master.scss";
import Admin from "./Pages/Admin";
import Lecturer from "./Pages/Lecturer";
import Home from "./Pages/Home";
import Write from "./Components/Student/Write";
import ViewReport from "./Components/Student/ViewReport";
import ProfilePage_Student from "./Components/Student/ProfilePage";
import ProfilePage_Lecturer from "./Components/Lecturer/ProfilePage";
import ProfilePage_Admin from "./Components/Admin/ProfilePage";
import ViewReport_Lecturer from "./Components/Lecturer/ViewReport";
import Login_Admin from "./Pages/Login/Admin";
import Login_Lecturer from "./Pages/Login/Lecturer";
import Login_Student from "./Pages/Login/Student";
import { DarkModeContextProvider } from "./Contexts/DarkModeContext";
import { UserContext, UserContextProvider } from "./Contexts/UserContext";
import List from "./Components/Lecturer/List";
import AttendancePage from "./Components/Student/AttendancePage";
import StudentsTable from "./Components/Admin/StudentsTable";
import LeaveRequest from "./Components/Admin/LeaveRequest";
import List2 from "./Components/Lecturer/List2";
import { useContext, useEffect } from "react";

function App() {
  const { user } = useContext(UserContext);
  // useEffect(() => {
  //   console.log(user);
  // }, [user])
  var login_student = false;
  if(localStorage.getItem('student') != undefined) {
    login_student = JSON.parse(localStorage.getItem('student'))
  }
  var login_lecturer = false;
  if(localStorage.getItem('lecturer') != undefined) {
    login_lecturer = JSON.parse(localStorage.getItem('lecturer'))
  }
  var login_admin = false;
  if(localStorage.getItem('admin') != undefined) {
    login_admin = JSON.parse(localStorage.getItem('lecturer'))
  }

  return (
    <>
    <Router>

    <Routes>

    <Route path="/" element={<Home/>}/>

    <Route path="/Student/:mail" element={login_student ? <Student/> : <Login_Student />} />
    
    <Route path="/Admin" element={<DarkModeContextProvider> <Admin/>  </DarkModeContextProvider>}/>
 
    <Route path="/Lecturer/:mail" element={login_lecturer ? <Lecturer/> : <Login_Lecturer />}/>

    {/* <Route path="/Home" element={<Home role = {role} />} /> */}

    <Route path="/Login_Admin" element={<Login_Admin/>}/>

    <Route path="/Login_Lecturer" element={<Login_Lecturer/>}/>

    <Route path="/Login_Student" element={<UserContextProvider> <Login_Student /> </UserContextProvider>}/>

    <Route path="/Lecturer/:mail/MarkAttendance" element={login_lecturer ? <List/> : <Login_Lecturer />}/>

    <Route path="/Lecturer/:mail/ModifyAttendance" element={login_lecturer ? <List2/> : <Login_Lecturer />}/>

    <Route path="/Lecturer/:mail/ViewReport" element={login_lecturer ? <ViewReport_Lecturer/> : <Login_Lecturer />}/>

    <Route path="/Student/:mail/MyAttendance" element={login_student ? <AttendancePage/> : <Login_Student/>}/>

    <Route path="/Student/:mail/ViewReport" element={login_student ? <ViewReport/> : <Login_Student/>}/>

    <Route path="/Student/:mail/ProfilePage" element={login_student ? <ProfilePage_Student/> : <Login_Student/>}/>

    <Route path="/Admin/ProfilePage" element={login_student ? <ProfilePage_Admin/> : <Login_Admin/>}/>

    <Route path="/Lecturer/:mail/ProfilePage" element={login_student ? <ProfilePage_Lecturer/> : <Login_Lecturer/>}/>

    <Route path="/Admin/ModifyStudents" element={<StudentsTable/>}/>

    <Route path="/Admin/LeaveRequests" element={<LeaveRequest/>}/>

    <Route path="/Student/:mail/LeaveRequest" element={login_student ? <Write/> : <Login_Student/>}/>

    </Routes>
    </Router>
    </>
  );
}

export default App;
