import "./subjectTab.scss"

import React, { useEffect } from 'react'

import SubjectComponent from "../../components/admin/SubjectComponent"
import { useSubjectContext } from "../../hooks/useSubject"
import SubjectForm from "../../components/admin/SubjectForm"

const SubjectTab = () => {

  const {subjects, dispatch} = useSubjectContext()

  useEffect(()=>{
    const fetchAllSubjects = async() => {
      const response = await fetch("/api/admin/subjects")
      const json = await response.json()

      if(response.ok){
        dispatch({type:"GET_ALL_SUBJECTS", payload:json})
      }
    }


    fetchAllSubjects()
  },[dispatch])

  return (
    <div className="tab">
      <div className="row">
        <div className="col-8 items">
          {subjects && 
            subjects.map((subject)=>(
              <div className="item">
                <SubjectComponent  key={subject._id} subject={subject}/>
              </div>
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