import React, { useEffect, useState } from 'react'

import {useAuthContext} from "../../../hooks/useAuthContext"
import {useAssignmentContext} from "../../../hooks/useAssignmentContext"
import {useSubjectContext} from "../../../hooks/useSubject"
import ViewAssignment from '../../../components/users/students/assignments/ViewAssignment'


const StudentProfile = () => {

  const {user} = useAuthContext()
  const {assignments, dispatch} = useAssignmentContext()
  const {subjects, dispatch:dispatchSubject} = useSubjectContext()


  const [isLoading , setIsLoading] = useState(true)

  // student details
  let academicYear = null;
  let department = null;


  const [isProfileLoading, setIsProfileLoading] = useState(true)
  const [isSubjectLoading , setIsSubjectLoading] = useState(true)

  // show student Details to profile section 
  const [studentFirtsName, setStudentFirstName] = useState("")
  const [studentRegistrationNumber, setStudentRegistrationNumber] = useState("")
  const [studentDepartment, setStudentDepartment] = useState("")
  const [studentAcademicYear, setStudentAcademicYear] = useState("")
  const [studentImage, setStudentImage] = useState(null)


  useEffect(()=>{
    // first we have to fetch the studnet details related to the email
    const fetchStudnetDetails = async() => {
      const response = await fetch(`/api/lmsUsers/students/getDetails?email=${user.email}`,{
        headers:{
          'Authorization':`${user.email} ${user.token}`
        }
      })
      const json = await response.json()
      if(response.ok){
        academicYear =  json[0]['academicYear']
        department = json[0]['department']
        setStudentFirstName(json[0]['firstName'])
        setStudentRegistrationNumber(json[0]['registrationNumber'])
        setStudentAcademicYear(json[0]['academicYear'])
        setStudentDepartment(json[0]['department'])
        setStudentImage(json[0]['studentImage'])
        getAlltheAssignmentsHasToDo()
        setIsProfileLoading(false)
      }
    }

    // want to fetch all the assignments we have to do 
    const getAlltheAssignmentsHasToDo = async() => {
      const response = await fetch(`/api/lmsUsers/studnet/getAlltheAssignmentsToDo?academicYear=${academicYear}&department=${department}` , {
        headers:{
          'Authorization':`${user.email} ${user.token}`
        }
      })

      const json = await response.json()
      if(response.ok){
        dispatch({type:"GET_ALL_ASSIGNMENTS", payload:json})
        setIsLoading(false)
        getAlltheRelatedSubjectNames()
      }
    }

    const getAlltheRelatedSubjectNames = async() => {
      const response = await fetch(`/api/lmsUsers/students/getRelatedSubjects?department=${department}&academicYear=${academicYear}` , {
        headers:{
          'Authorization':`${user.email} ${user.token}`
        }
      })
      const json = await response.json()

      if(response.ok){
        dispatchSubject({type:"GET_ALL_SUBJECTS", payload:json})
        setIsSubjectLoading(false)
      }
    }
    

    if(user){
      fetchStudnetDetails()
    }
  },[])


  return (
    <div className="studentProfile">
      <div className="row">
      <div className="col-8">
        <h6>ASSESMENTS</h6>
        {isLoading ? <p>LOADING</p> : (
          assignments && assignments.map((assignment)=>(
            <ViewAssignment key={assignment._id} assignment={assignment} parentComponent="/lmsUser/student/profile" />
          ))
        )}
      </div>
      <div className="col-4 profile" style={{border:"0.2px solid black"}}>
        <h6>Profile</h6>
        {isProfileLoading ? <p>Loading</p> : (
          <>
            <p>Welcome <strong> {studentFirtsName}</strong></p>
            <p><strong>Registration Number: </strong>{studentRegistrationNumber}</p>
            <img src={studentImage} className='mx-auto d-block img-fluid'/>
            <p><strong>Department: </strong>{studentDepartment}</p>
            <p><strong>Academic Year: </strong>{studentAcademicYear}</p>
            <p><strong>Subjects</strong></p>
            <ul>
            {isSubjectLoading ? <p>LOADING</p> : (
              subjects && subjects.map((subject)=>(
                <li key={subject._id}>{subject.subjectName}</li>
              ))
            )}
            </ul>
          </>
        )}
      </div>
      </div>
    </div>
  )
}

export default StudentProfile