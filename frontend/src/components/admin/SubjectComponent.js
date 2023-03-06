import React, { useState } from 'react'
import {useSubjectContext} from "../../hooks/useSubject"
import {useAuthContext} from "../../hooks/useAuthContext"

const SubjectComponent = ({subject}) => {

  const {user} = useAuthContext()
  const {dispatch} = useSubjectContext()

  const[isEditing, setIsEditing] = useState(false)


  //for updating fields
  const [draftTaughtBy, setDraftTaughtBy] = useState("")
  const [draftNumberOfStudents, setDraftNumberOfStudents] = useState("")
  const [draftTaughtByEmail, setDraftTaughtByEmail] = useState("")


  const handleUpdate =  async(e) => {
    e.preventDefault()

    if(!user){
      throw Error("You have to logged in first")
    }

    const formData = new FormData()
    formData.append('taughtBy', draftTaughtBy)
    formData.append('numberOfStudents', draftNumberOfStudents)
    formData.append('taughtByEmail', draftTaughtByEmail)


    const response = await fetch("/api/admin/subjects/" + subject._id, {
      method:"PATCH",
      body:formData,
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })

    const json = await response.json()
    if(response.ok){
      setIsEditing(false)
      dispatch({type:'UPDATE_SUBJECT', payload:json})
    }
  }

  const handleDelete = async(e) => {
    e.preventDefault()

    if(!user){
      throw Error("You have to logged in first")
    }

    const response = await fetch("/api/admin/subjects/" + subject._id,{
      method:"DELETE",
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })

    const json = await response.json()

    if(response.ok){
      dispatch({type:'DELETE_SUBJECT', payload:json})
    }
  }

  return (
     <>
      {!isEditing && (
        <div className='card col-4'>
        <div className="card-body">
            <p><strong>Subject Name: </strong>{subject.subjectName}</p>
            <p><strong>Taught by: </strong>{subject.taughtBy}</p>
            <p><strong>Taught by Email: </strong>{subject.taughtByEmail}</p>
            <p><strong>Number of Students: </strong>{subject.numberOfStudents}</p>
            <p><strong>Academic Year: </strong>{subject.academicYear}</p>
            <p><strong>Department: </strong>{subject.department}</p>
        </div>
        <div className="card-footer">
            <button 
              className='btn btn-outline-success mr-3'
              onClick={()=>{
                setIsEditing(true)
                setDraftTaughtBy(subject.taughtBy)
                setDraftTaughtByEmail(subject.taughtByEmail)
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
              <label>Taught By</label>
              <input 
                type="text" 
                onChange={e=>setDraftTaughtBy(e.target.value)}
                value={draftTaughtBy}
                className='form-control'
              />
            </div>
            <div className="form-group">
              <label>Taught By Email</label>
              <input 
                type="text" 
                onChange={e=>setDraftTaughtByEmail(e.target.value)}
                value={draftTaughtByEmail}
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