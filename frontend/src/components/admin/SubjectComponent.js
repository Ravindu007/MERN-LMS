import React, { useState } from 'react'
import {useSubjectContext} from "../../hooks/useSubject"

const SubjectComponent = ({subject}) => {

  const {dispatch} = useSubjectContext()

  const[isEditing, setIsEditing] = useState(false)


  //for updating fields
  const [draftSubjectName, setDraftSubjectName] = useState("")
  const [draftTaughtBy, setDraftTaughtBy] = useState("")
  const [draftNumberOfStudents, setDraftNumberOfStudents] = useState("")


  const handleUpdate =  async(e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('subjectName', draftSubjectName) 
    formData.append('taughtBy', draftTaughtBy)
    formData.append('numberOfStudents', draftNumberOfStudents)

    const response = await fetch("/api/admin/subjects/" + subject._id, {
      method:"PATCH",
      body:formData
    })

    const json = await response.json()
    if(response.ok){
      setIsEditing(false)
      dispatch({type:'UPDATE_SUBJECT', payload:json})
    }
  }

  const handleDelete = async(e) => {
    e.preventDefault()

    const response = await fetch("/api/admin/subjects/" + subject._id,{
      method:"DELETE"
    })

    const json = await response.json()

    if(response.ok){
      dispatch({type:'DELETE_SUBJECT', payoad:json})
    }
  }

  return (
     <>
      {!isEditing && (
        <div className='card col-4'>
        <div className="card-body">
            <p><strong>Subject Name: </strong>{subject.subjectName}</p>
            <p><strong>Taught by: </strong>{subject.taughtBy}</p>
            <p><strong>Number of Students: </strong>{subject.numberOfStudents}</p>
        </div>
        <div className="card-footer">
            <button 
              className='btn btn-outline-success mr-3'
              onClick={()=>{
                setIsEditing(true)
                setDraftSubjectName(subject.subjectName)
                setDraftTaughtBy(subject.taughtBy)
                setDraftNumberOfStudents(subject.numberOfStudents)
              }}
            >
              Update
            </button>
            <button 
              className='btn btn-outline-danger'
              onClick={handleDelete}
            >
              Delete
            </button>
        </div> 
        </div>
      )}
      {isEditing && (
        <>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label>Subject Name</label>
              <input 
                type="text" 
                onChange={e=>setDraftSubjectName(e.target.value)}
                value={draftSubjectName}
                className='form-control'
              />
            </div>
            <div className="form-group">
              <label>Taught By</label>
              <input 
                type="text" 
                onChange={e=>setDraftTaughtBy(e.target.value)}
                value={draftTaughtBy}
                className='form-control'
              />
            </div>
            <div className="form-group">
              <label>Number of Students</label>
              <input 
                type="text" 
                onChange={e=>setDraftNumberOfStudents(e.target.value)}
                value={draftNumberOfStudents}
                className='form-control'
              />
            </div>
            <div className="buttons">
              <button 
                className='btn btn-outline-info mr-3'
              >
                Save
              </button>
              <button 
                className='btn btn-outline-secondary'
                onClick={()=>{
                  setIsEditing(false)
                }}
              >
                cancel
              </button>
            </div>
          </form>
        </>
      )}
     </>
  )
}

export default SubjectComponent