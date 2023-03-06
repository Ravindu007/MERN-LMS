import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Navbar from "./components/navbar/Navbar";
import SeperateSubjectView from "./components/users/teachers/SeperateSubjectView";

//context
import { useAuthContext } from "./hooks/useAuthContext";

//pages
import AdminDashboard from "./pages/adminPages/AdminDashboard";
import StudentTab from "./pages/adminPages/StudentTab";
import SubjectTab from "./pages/adminPages/SubjectTab";
import TeacherTab from "./pages/adminPages/TeacherTab";
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
import SubjectView from "./pages/user/teacher/SubjectView";


function App() {

  const {user} = useAuthContext()

  
  return (
    <div className="App"> 
    <BrowserRouter>
      <Navbar/>
      <Routes>

        {/* admin routes */}
        <Route path="/admin" element={user ? <AdminDashboard/> : <Navigate to="/login"/>} />
        <Route path="/admin/teachers" element={user ? <TeacherTab/> : <Navigate to="/login"/>} />
        <Route path="/admin/students" element={user ?<StudentTab/> :<Navigate to="/login"/>} />
        <Route path="/admin/subjects" element={user ? <SubjectTab/> :<Navigate to="/login"/>} />


        {/* Authentication user routes */}
        <Route path="/login" element={!user ? <Login/>: <Navigate to="/admin"/>}/>
        <Route path="/signup" element={!user ? <Signup/>: <Navigate to="/admin"/>}/>

        {/* teacher users */}
        <Route path="/lmsUser/teacher/subjectView" element={user ? <SubjectView/>:<Navigate to="/login"/>}/>
        <Route path="/lmsUser/teacher/subjectView/view/:id" element={user ? <SeperateSubjectView/> : <Navigate to="/login"/>}/>
  
      </Routes>
    </BrowserRouter>      
    </div>
  );
}

export default App;
