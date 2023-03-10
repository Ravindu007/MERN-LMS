import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Navbar from "./components/navbar/Navbar";
import SeperateSubjectView from "./components/users/teachers/SeperateSubjectView";

//context
import { useAuthContext } from "./hooks/useAuthContext";

//pages
import Home from "./pages/Home"
import AdminDashboard from "./pages/adminPages/AdminDashboard";
import StudentTab from "./pages/adminPages/StudentTab";
import SubjectTab from "./pages/adminPages/SubjectTab";
import TeacherTab from "./pages/adminPages/TeacherTab";
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
import SubjectView from "./pages/user/teacher/SubjectView";
import StudentSubjectView from "./pages/user/student/StudentSubjectView";
import SeperateSubjectStudentView from "./components/users/students/SeperateSubjectStudentView";
import { useEffect, useState } from "react";
import ViewMoreAssignment from "./components/users/teachers/Assignments/ViewMoreAssignment";
import SeperateAssignmentView from "./components/users/students/assignments/SeperateAssignmentView";
import EventTab from "./pages/adminPages/EventTab";
import StudentProfile from "./pages/user/student/StudentProfile";



function App() {

  const {user} = useAuthContext()
  
  // const isAdminUser = user && user.email === process.env.REACT_APP_ADMIN_EMAIL;

  const [fetchUserRole, setFetchUserRole] = useState("")

  useEffect(()=>{
    //fetch all common users in order to figure out the user role based on email
    const fetchAllUsers = async() =>{
      const response = await fetch(`/api/admin/lmsUser/commonUser/userRole?userEmail=${user.email}`,{
        headers:{
          'Authorization':`${user.email} ${user.token}`
        }
      })
      const json  = await response.json()

      if(response.ok){
        setFetchUserRole(json[0].userRole)
      }
    }

    if(user){
      fetchAllUsers()
    }
  },[user,setFetchUserRole, fetchUserRole])

  return (
    <div className="App"> 
    <BrowserRouter>
      <Navbar userRole={fetchUserRole}/>
      <Routes>
        {/* home route */}
        <Route path="/" element={user ? <Home/> : <Navigate to="/login"/>} />

        {/* admin routes */}
        {/* {isAdminUser && (
          <>
          <Route path="/admin" element={user ? <AdminDashboard/> : <Navigate to="/login"/>} />
          <Route path="/admin/teachers" element={user ? <TeacherTab/> : <Navigate to="/login"/>} />
          <Route path="/admin/students" element={user ?<StudentTab/> :<Navigate to="/login"/>} />
          <Route path="/admin/subjects" element={user ? <SubjectTab/> :<Navigate to="/login"/>} />
          <Route path="/admin/events" element={user ? <EventTab/> :<Navigate to="/login"/>} />
          </>
        )} */}
        
        {fetchUserRole === 'admin' && (
          <>
          <Route path="/admin" element={user ? <AdminDashboard/> : <Navigate to="/login"/>} />
          <Route path="/admin/teachers" element={user ? <TeacherTab/> : <Navigate to="/login"/>} />
          <Route path="/admin/students" element={user ?<StudentTab/> :<Navigate to="/login"/>} />
          <Route path="/admin/subjects" element={user ? <SubjectTab/> :<Navigate to="/login"/>} />
          <Route path="/admin/events" element={user ? <EventTab/> :<Navigate to="/login"/>} />
          </>
        )}


        {/* Authentication user routes */}
        <Route path="/login" element={!user ? <Login/>: <Navigate to="/"/>}/>
        <Route path="/signup" element={!user ? <Signup/>: <Navigate to="/"/>}/>

                
      {/* teacher user */}
      {fetchUserRole === 'teacher'&& (
        <>
        <Route path="/lmsUser/teacher/subjectView" element={user ? <SubjectView/>:<Navigate to="/login"/>}/>
        <Route path="/lmsUser/teacher/subjectView/view/:id" element={user ? <SeperateSubjectView/> : <Navigate to="/login"/>}/>
        <Route path="/lmsUser/teacher/subjectView/assignments/:id" element={user ? <ViewMoreAssignment/> :<Navigate to="/login"/>}/>
        </>
      )}
        


      {fetchUserRole === 'student' && (
      <>
        {/* student user */}
        <Route path="/lmsUser/student/subjectView" element={user ? <StudentSubjectView/> : <Navigate to="/"/>}/>
        <Route path="/lmsUser/student/subjectView/view/:id" element={user ? <SeperateSubjectStudentView/> : <Navigate to="/"/>}/>
        <Route path="/lmsUser/student/subjectView/assignments/:id" element={user ? <SeperateAssignmentView/> : <Navigate to="/"/>}/>
        <Route path="/lmsUser/student/profile" element={user ? <StudentProfile/> : <Navigate to="/"/>}/>
      </>
      )}
        
  
      </Routes>
    </BrowserRouter>      
    </div>
  );
}

export default App;
