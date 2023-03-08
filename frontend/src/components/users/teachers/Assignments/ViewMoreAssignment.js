import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { useAssignmentContext } from '../../../../hooks/useAssignmentContext'
import { useAuthContext } from '../../../../hooks/useAuthContext'

const ViewMoreAssignment = () => {
  const navigate = useNavigate();

  const {user} = useAuthContext()
  const {assignments:singleAssignment, dispatch} = useAssignmentContext()


  const [isEditing, setIsEditing] = useState(false)

  // update fields
  const [draftAssignmentTitle, setDraftAssignmentTitle] = useState("")
  const [draftDeadline, setDraftDeadline] = useState("")
  const [draftAssignmentFile, setDraftAssignmentFile] = useState(null)


  //assignmet id
  const {id} = useParams()
  //fetch single assignment related to the id
  useEffect(()=>{
    const fetchSingleAssignemnt = async() => {
      const response = await fetch("/api/lmsUsers/teacher/getRelatedAssignments/" + id,{
        headers:{
          'Authorization':`${user.email} ${user.token}`
        }
      })

      const json = await response.json()

      if(response.ok){
        dispatch({type:"GET_SINGLE_ASSIGNMENT",payload:json})
      }
    }

    if(user){
      fetchSingleAssignemnt()
    }
  },[user, dispatch])


  const handleUpdate = async(e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('assignmentTitle', draftAssignmentTitle)
    formData.append('deadline',draftDeadline)
    formData.append('assignmentFile', draftAssignmentFile)

    const response = await fetch("/api/lmsUsers/teacher/getRelatedAssignments/" + id,{
      method:"PATCH",
      body:formData,
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })
    const json = await response.json()

    if(response.ok){
      dispatch({type:"UPDATE_ASSIGNMENT", payload:json})
      setIsEditing(false)
    }
  }

  const handleDelete = async(e) => {
    const response = await fetch("/api/lmsUsers/teacher/getRelatedAssignments/"+id,{
      method:"DELETE",
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })

    const json = await response.json()

    if(response.ok){
      dispatch({type:"DELETE_ASSIGNMENT",payload:json})
      navigate(`/lmsUser/teacher/subjectView/view/${singleAssignment.subjectId}`);
    }
  }

  return (
    <div className="viewMoreAssignment" style={{border:"0.2px solid black"}}>
     {!isEditing && singleAssignment && (
      <div className="row assignemnt">
      <div className="col-10 details">
      <p><strong>Assigment Title: </strong>{singleAssignment.assignmentTitle}</p>
      <p><strong>Deadline: </strong>{singleAssignment.deadline}</p>
      <a href={singleAssignment.assignmentFile} className="pdf-link" download target="_blank">
      <img src="/pdf-icon.png" alt="PDF Icon" style={{width:"50px", height:"50px"}} />
      </a>
      </div>
    
     <div className="col-2 buttons mt-5" >
       <button 
        className='btn btn-outline-info'
        onClick={()=>{
          setIsEditing(true)
          setDraftAssignmentTitle(singleAssignment.assignmentTitle)
          setDraftDeadline(singleAssignment.deadline)
          setDraftAssignmentFile(singleAssignment.assignmentFile)
        }}
        >
          UPDATE
        </button>
       <button 
        className='btn btn-outline-danger'
        onClick={handleDelete}
        >
          DELETE
        </button>
     </div>
     </div>
     )}
    {isEditing && (
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Assignment Title</label>
          <input 
            type="text" 
            className='form-control'
            onChange={e=>{setDraftAssignmentTitle(e.target.value)}}
            value={draftAssignmentTitle}
          />
        </div>
        <div className="form-group">
          <label>Deadline</label>
          <input 
            type="date" 
            className='form-control'
            onChange={e=>{setDraftDeadline(e.target.value)}}
            value={draftDeadline}
          />
        </div>
        <div className="form-group">
          <label>Assignment File</label>
          <input 
            type="file" 
            className='form-control'
            onChange={e=>{setDraftAssignmentFile(e.target.files[0])}}
            name="assignmentFile"
          />
        </div>
        <div className="buttons">
          <button className='btn btn-outline-primary'>SAVE</button>
          <button 
            className='btn btn-outline-secondary'
            onClick={()=>{
              setIsEditing(false)
            }}
            >
              CANCEL
          </button>
        </div>
      </form>
    )}


      {/* responses */}
      <div className="row responses mt-5" style={{border:"0.2px solid red"}}>
        <p>Responses</p>
      </div>
    </div>
  )
}

export default ViewMoreAssignment