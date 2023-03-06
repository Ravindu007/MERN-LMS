import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext'

const StudentSubjectView = () => {
  const {user} = useAuthContext()


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
      }
    } 

    // then using those 2 things fetch relevant subject
    const fetchRelevantSubjects = async() => {

    }

    if(user){
      fetchStudnetDetails()
    }
  },[])



  return (
    <div className="studentSubjectView">

    </div>
  )
}

export default StudentSubjectView