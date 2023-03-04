import {BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from "./components/navbar/Navbar";

//pages
import AdminDashboard from "./pages/adminPages/AdminDashboard";
import StudentTab from "./pages/adminPages/StudentTab";
import SubjectTab from "./pages/adminPages/SubjectTab";
import TeacherTab from "./pages/adminPages/TeacherTab";
import SubjectView from "./pages/user/teacher/SubjectView";


function App() {
  return (
    <div className="App"> 
    <BrowserRouter>
      <Navbar/>
      <Routes>

        {/* admin routes */}
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/admin/teachers" element={<TeacherTab/>} />
        <Route path="/admin/students" element={<StudentTab/>} />
        <Route path="/admin/subjects" element={<SubjectTab/>} />

        {/* techer routes */}
        <Route path="/user/subjects" element={<SubjectView/>}/>

        
      </Routes>
    </BrowserRouter>      
    </div>
  );
}

export default App;
