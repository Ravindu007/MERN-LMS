import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAssignmentContext } from '../../../../hooks/useAssignmentContext'
import { useAuthContext } from '../../../../hooks/useAuthContext'
import {useSubmissionContext} from "../../../../hooks/useSubmissionContext"

const SeperateAssignmentView = () => {
  const navigate = useNavigate()

  const {user} = useAuthContext()
  const {assignments:singleAssignment, dispatch} = useAssignmentContext()
  const {submissions, dispatch:dispatchSubmissions} = useSubmissionContext()

  // assignment id
  const {id} = useParams()

  // fetch single assignemnt relted to that id
  useEffect(()=>{
    const fetchSingleAssignment = async() => {
      const response = await fetch("/api/lmsUsers/teacher/getRelatedAssignments/" + id,{
        headers:{
          'Authorization':`{user.email} ${user.token}`
        }
      })

      const json = await response.json()
      if(response.ok){
        dispatch({type:"GET_SINGLE_ASSIGNMENT",payload:json})
      }
    }

    if(user){
      fetchSingleAssignment()
    }
  },[])


  // inputfields
  const [submissionFile, setSubmissionFile] = useState(null)
  const [userRegistrationNumber, setUserRegistrationNumber] = useState("")

  const handleSubmit = async(e) =>{
    e.preventDefault()

    const userEmail = user.email

    const formData = new FormData()

    formData.append('assignmentId',id)
    formData.append('registrationNumber', userRegistrationNumber)
    formData.append('studentEmail',userEmail)
    formData.append('submissionFile',submissionFile)
    formData.append('marks','Not graded')

    const response = await fetch("/api/lmsUsers/getSubmissions",{
      method:"POST",
      body:formData,
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })

    const json = await response.json()

    if(response.ok){
      dispatch({type:"CREATE_SUBMISSION",payload:json})
    }
  }

  return (
    <div className='seperateAssignmentView'>
      <p>{id}</p>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label>Registration Number</label>
          <input 
            type="text"
            className='form-control'
            onChange={e=>setUserRegistrationNumber(e.target.value)}
            value={userRegistrationNumber}
          />
        </div>
        <div className="form-group">
          <label>Submission File</label>
          <input 
            type="file"
            className='form-control'
            onChange={e=>setSubmissionFile(e.target.files[0])}
            name='submissionFile'
          />
        </div>
        <button 
          className='btn btn-outline-info'
          data-toggle="modal"
          data-target="#basicModal"
        >
          SUBMIT
        </button>
        <button 
          className='btn btn-outline-secondary'
          onClick={()=>{
            navigate(`/lmsUser/student/subjectView/view/${singleAssignment.subjectId}`)
          }}
          >
            CANCEL
          </button>
      </form>

      <div className="modal" tabIndex={-1} role='dialog' id='basicModal'>
        <div className="modal-dialog" role='document'>
          <div className="modal-content">
            <div className="modal-body">
              <p>ASSIGNMENT UPLOADED</p>
            </div>
            <div className="modal-footer">
                <button 
                  className='btn btn-outline-info' 
                  data-dismiss="modal"
                  onClick={()=>{
                    navigate(`/lmsUser/student/subjectView/view/${singleAssignment.subjectId}`)
                  }}
                  >
                    CLOSE
                  </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeperateAssignmentView