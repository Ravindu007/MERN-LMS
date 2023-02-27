import "./Tab.scss"

import React, { useEffect, useState } from 'react'
import TeacherComponent from '../../components/admin/TeacherComponent'
import TeacherForm from "../../components/admin/TeacherForm"

const TeacherTab = () => {

  const[teachers, setTeachers] = useState("")

  useEffect(()=>{
    const fetchALLTeachers = async() =>{
      const response = await fetch("/api/admin/users/teachers")
      const json = await response.json()

      if(response.ok){
        setTeachers(json)
      }
    }

    fetchALLTeachers()
  })


  return (
    <div className="tab">
      <div className="row">
        <div className="col-8 items">
          {teachers && 
            teachers.map((teacher)=>(
              <TeacherComponent  key={teacher._id} teacher={teacher}/>
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