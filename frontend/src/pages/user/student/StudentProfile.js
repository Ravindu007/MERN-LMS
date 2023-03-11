import React, { useEffect, useState } from 'react'

import {useAuthContext} from "../../../hooks/useAuthContext"
import {useAssignmentContext} from "../../../hooks/useAssignmentContext"
import ViewAssignment from '../../../components/users/students/assignments/ViewAssignment'


const StudentProfile = () => {

  const {user} = useAuthContext()
  const {assignments, dispatch} = useAssignmentContext()

  const [isLoading , setIsLoading] = useState(true)

  // student details
  let academicYear = null;
  let department = null;

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
        getAlltheAssignmentsHasToDo()
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
      }
    }

    if(user){
      fetchStudnetDetails()
    }
  },[])


  return (
    <div className="studentProfile">
      {isLoading ? <p>LOADING</p> : (
        assignments && assignments.map((assignment)=>(
          <ViewAssignment key={assignment._id} assignment={assignment} parentComponent="/lmsUser/student/profile" />
        ))
      )}
    </div>
  )
}

export default StudentProfile