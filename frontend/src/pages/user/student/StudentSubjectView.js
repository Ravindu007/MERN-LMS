import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { useSubjectContext} from "../../../hooks/useSubject"

// component
import StudentSubject from "../../../components/users/students/StudentSubject"

const StudentSubjectView = () => {
  const {user} = useAuthContext()
  const {subjects, dispatch}  = useSubjectContext()

  //loading state
  const [isLoading, setIsLoading] = useState(true)


  const [studentDepartment, setStudentDepartment] = useState("")
  const [studentAcademicYear, setStudentAcademicYear] = useState("")

  const userEmail = user.email

  useEffect(()=>{ 
    // send user email to backend and fetch the academic year and department
    const fetchStudnetDetails = async() => {
      const response = await fetch(`/api/lmsUsers/students/getDetails?email=${userEmail}` ,{
        headers:{
          'Authorization':`${user.email} ${user.token}`
        }
      })

      const json = await response.json()

      if(response.ok){
        // get only department and academic year
        setStudentDepartment(json[0]['department']);
        setStudentAcademicYear(json[0]['academicYear'])

        // call fetchRelevantSubjects once department and academic year have been set
        fetchRelevantSubjects();
      }
    } 

    // then using those 2 things fetch relevant subject
    const fetchRelevantSubjects = async() => {
      const response = await fetch(`/api/lmsUsers/students/getRelatedSubjects?department=${studentDepartment}&academicYear=${studentAcademicYear}`, {
        headers:{
          'Authorization':`${user.email} ${user.token}`
        }
      })

      const json = await response.json()

      if(response.ok){
        dispatch({type:'GET_ALL_SUBJECTS', payload:json})
        setIsLoading(false)
      }
    }

    if(user){
      fetchStudnetDetails()
    }    
    
  },[studentDepartment, studentAcademicYear])



  return (
    <div className="studentSubjectView">
        <div className="subject-set">
          <div className="row" >
          {isLoading ? <p>LOADIN...</p> : (
            subjects && subjects.map((subject)=>(
              <div  key={subject._id} className="col-4">
                <StudentSubject subject={subject}/>
              </div>
            ))
          )}
          </div>
        </div>
    </div>
  )
}

export default StudentSubjectView