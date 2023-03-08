import React, { useState } from 'react'

import 'animate.css';
import { useAuthContext } from '../../../../hooks/useAuthContext';
import {useAssignmentContext} from "../../../../hooks/useAssignmentContext"

const AssignmentForm = ({subject}) => {

  const {user} = useAuthContext()
  const {assignments, dispatch} = useAssignmentContext()

  const [assignementTitle, setAssignmentTitle] = useState("")
  const [deadline, setDeadline] = useState("")
  const [assignmentFile, setAssignmentFile] = useState(null)


  const handleSubmit = async(e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('subjectId',subject._id)
    formData.append('assignmentTitle', assignementTitle)
    formData.append('deadline',deadline)
    formData.append('assignmentFile', assignmentFile)

    const response = await fetch("/api/lmsUsers/teacher/getRelatedAssignments",{
      method:"POST",
      body:formData,
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })

    const json = await response.json()

    if(response.ok){
      dispatch({type:"CREATE_ASSIGNMENT", payload:json})
    }
  }

  return (
    <div className="container">
      <div className="animate__animated animate__zoomIn" style={{border:"0.2px solid black", padding:"5px"}}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Assignemnt Title</label>
          <input 
            type="text"
            className='form-control'
            onChange={e=>{setAssignmentTitle(e.target.value)}}
            value={assignementTitle}
          />
        </div>
        <div className="form-group">
          <label>Deadline</label>
          <input 
            type="date"
            className='form-control'
            onChange={e=>{setDeadline(e.target.value)}}
            value={deadline}
          />
        </div>
        <div className="form-group">
          <label>Assignemnt File</label>
          <input 
            type="file"
            className='form-control'
            onChange={e=>{setAssignmentFile(e.target.files[0])}}
            name='assignmentFile'
          />
        </div>
        <button className='btn btn-outline-primary'>ADD</button>
      </form>
    </div>
    </div>
  )
}

export default AssignmentForm