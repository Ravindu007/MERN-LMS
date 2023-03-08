import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAssignmentContext } from '../../../../hooks/useAssignmentContext'
import { useAuthContext } from '../../../../hooks/useAuthContext'

const SeperateAssignmentView = () => {
  const navigate = useNavigate()

  const {user} = useAuthContext()
  const {assignments:singleAssignment, dispatch} = useAssignmentContext()

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

  return (
    <div className='seperateAssignmentView'>
      <p>{id}</p>
      <form>
        <div className="form-group">
          <label>Submission File</label>
          <input 
            type="file"
            className='form-control'
            onChange={e=>setSubmissionFile(e.target.files[0])}
            name='submissionFile'
          />
        </div>
        <button className='btn btn-outline-info'>SUBMIT</button>
        <button 
          className='btn btn-outline-secondary'
          onClick={()=>{
            navigate(`/lmsUser/student/subjectView/view/${singleAssignment.subjectId}`)
          }}
          >
            CANCEL
          </button>
      </form>
    </div>
  )
}

export default SeperateAssignmentView