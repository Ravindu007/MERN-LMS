import React, { useEffect } from 'react'
import {useAuthContext} from "../../../hooks/useAuthContext"
import {useSubjectContext} from "../../../hooks/useSubject"

const SubjectView = () => {

  const {user} = useAuthContext()
  const {subjects, dispatch} = useSubjectContext()

  //fetch subjetcs related to email
  useEffect(()=>{

    const fetchRelatedSubject = async() => {
      const response = await fetch("/api/admin/lmsUser/teacher/getRealtedSubjects/",{
        headers:{
          'Authorization':`${user.email} ${user.token}`
        }
      })

      const json = await response.json()

      if(response.ok){
        console.log(json);
        dispatch({type:'GET_SINGLE_SUBJECT', payload:json})
      }
    }

    fetchRelatedSubject()
  },[dispatch])

  return (
    <div className="subjectView">
      {subjects && subjects.map((subject)=>(
        <p key={subject._id}>{subject.subjectName}</p>
      ))}
    </div>
  )
}

export default SubjectView