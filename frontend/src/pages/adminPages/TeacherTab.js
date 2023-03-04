import "./teacherTab.scss"

import React, { useEffect } from 'react'
import TeacherComponent from '../../components/admin/TeacherComponent'
import TeacherForm from "../../components/admin/TeacherForm"

import {useLmsUserContext} from "../../hooks/useLmsUser"

const TeacherTab = () => {

  const {lmsUsers, dispatch} = useLmsUserContext()


  useEffect(()=>{
    const fetchALLTeachers = async() =>{
      const response = await fetch("/api/admin/lmsUsers/teachers")
      const json = await response.json()

      if(response.ok){
        dispatch({type:"SET_LMSUSERS", payload:json})
      }
    }

    fetchALLTeachers()
  })


  return (
    <div className="tab">
      <div className="row">
        <div className="col-8 items">
          {lmsUsers && 
            lmsUsers.map((lmsUser)=>(
                <TeacherComponent  key={lmsUser._id} teacher={lmsUser} />
            ))}
        </div>
        <div className="col-4 add-item">
          <TeacherForm/>
        </div>
      </div>
    </div>
  )
}

export default TeacherTab