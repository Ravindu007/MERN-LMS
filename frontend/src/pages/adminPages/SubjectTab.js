import React, { useEffect } from 'react'

import SubjectComponent from "../../components/admin/SubjectComponent"
import { useSubjectContext } from "../../hooks/useSubject"
import {useAuthContext} from "../../hooks/useAuthContext"
import SubjectForm from "../../components/admin/SubjectForm"

import "./subjectTab.scss"

const SubjectTab = () => {
  const {user} = useAuthContext()

  const {subjects, dispatch} = useSubjectContext()

  useEffect(()=>{
    const fetchAllSubjects = async() => {
      const response = await fetch("/api/admin/subjects",{
        headers:{
          'Authorization':`${user.email} ${user.token}`
        }
      })
      const json = await response.json()

      if(response.ok){
        dispatch({type:"GET_ALL_SUBJECTS", payload:json})
      }
    }

    if(user){
      fetchAllSubjects()
    }
  },[dispatch, user])

  return (
    <div className="tab">
      <div className="row">
        <div className="col-8 items">
          {subjects && 
            subjects.map((subject)=>(
                <SubjectComponent key={subject._id} subject={subject} />
            ))}
        </div>  
        <div className="col-4 add-item">
          {<SubjectForm/>}
        </div>
      </div>
    </div>
  )
}

export default SubjectTab