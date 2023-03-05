import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Navbar from "./components/navbar/Navbar";

//context
import { useAuthContext } from "./hooks/useAuthContext";

//pages
import AdminDashboard from "./pages/adminPages/AdminDashboard";
import StudentTab from "./pages/adminPages/StudentTab";
import SubjectTab from "./pages/adminPages/SubjectTab";
import TeacherTab from "./pages/adminPages/TeacherTab";
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
// import SubjectView from "./pages/user/teacher/SubjectView";


function App() {

  const {user} = useAuthContext()
  return (
    <div className="App"> 
    <BrowserRouter>
      <Navbar/>
      <Routes>

        {/* admin routes */}
        <Route path="/admin" element={user ? <AdminDashboard/> : <Navigate to="/login"/>} />
        <Route path="/admin/teachers" element={<TeacherTab/>} />
        <Route path="/admin/students" element={<StudentTab/>} />
        <Route path="/admin/subjects" element={<SubjectTab/>} />


        {/* Authentication user routes */}
        <Route path="/login" element={!user ? <Login/>: <Navigate to="/admin"/>}/>
        <Route path="/signup" element={!user ? <Signup/>: <Navigate to="/admin"/>}/>
  
      </Routes>
    </BrowserRouter>      
    </div>
  );
}

export default App;
