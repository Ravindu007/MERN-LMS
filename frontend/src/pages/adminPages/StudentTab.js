import React, { useEffect } from 'react'
import StudentComponent from '../../components/admin/StudentComponent'
import StudentForm from '../../components/admin/StudentForm'
import { useLmsUserContext } from '../../hooks/useLmsUser'
import {useAuthContext} from "../../hooks/useAuthContext"

const StudentTab = () => {

  const {user} = useAuthContext()
  
  const {lmsUsers:students, dispatch} = useLmsUserContext()

  useEffect(()=>{
    const fetchAllStudents = async() => {
      const response = await fetch("/api/admin/lmsUsers/students",{
        headers:{
          'Authorization':`${user.email} ${user.token}`
        }
      })
      const json = await response.json()

      if(response.ok){
        dispatch({type:'SET_LMSUSERS', payload:json})
      }
    }


    if(user){
      fetchAllStudents()
    }
  },[dispatch, user])

  return (
   <div className='row'>
   <div className="col-8">
     <div className="student-tab">
      {students && students.map((student)=>(
        <StudentComponent key={student._id} student={student}/>
      ))}
    </div>
   </div>
   <div className="col-4">
    <StudentForm/>
   </div>
   </div>
  )
}

export default StudentTab