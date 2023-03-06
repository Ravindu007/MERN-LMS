import React, { useState } from 'react'
import { useLmsUserContext } from '../../hooks/useLmsUser'
import {useAuthContext} from "../../hooks/useAuthContext"


import "./StudentComponent.scss"

const StudentComponent = ({student}) => {
  const {user} = useAuthContext()
  const {dispatch} = useLmsUserContext()


  const [isEditing, setIsEditing] = useState(false)

  //inputfiels
  const [draftEmail, setDraftEmail] = useState("")
  const [draftAcademicYear, setDraftAcademicYear] = useState("")
  const [draftImage, setDraftImage] = useState(null)


  const handleUpdate = async(e) => {
    e.preventDefault()

    if(!user){
      throw Error("You have to logged in first")
    }

    const formData = new FormData()
    formData.append('email', draftEmail)
    formData.append('academicYear',draftAcademicYear)
    formData.append('studentImage', draftImage)
    

    const response = await fetch("/api/admin/lmsUsers/students/" + student._id,{
      method:"PATCH",
      body:formData,
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })

    const json = await response.json()

    if(response.ok){
      dispatch({type:'UPDATE_LMSUSER', payload:json})
      setIsEditing(false)
    }
  }

  const handleDelete = async(e) => {
    e.preventDefault()

    if(!user){
      throw Error("You have to logged in first")
    }

    const response = await fetch("/api/admin/lmsUsers/students/" + student._id,{
      method:"DELETE",
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })

    const json = await response.json()

    if(response.ok){
      dispatch({type:'DELETE_LMSUSER', payload:json})
    }
  }

  return (
    <>
      {!isEditing && (
        <div className="student-component">
          <div className="col-8 details">
            <p><strong>Registration No: </strong>{student.registrationNumber}</p>
            <p><strong>Name: </strong>{student.fullName}</p>
            <p><strong>Email: </strong>{student.email}</p>
            <p><strong>Academic Year: </strong>{student.academicYear}</p>
            <p><strong>Department: </strong>{student.department}</p>
          </div>
          <div className="col-4 img-part">
            <img src={student.studentImage} alt={student.studentImage} className='mx-auto d-bblock img-fluid'/>
            <div className="buttons">
              <button 
                className='btn btn-outline-success'
                onClick={()=>{
                  setIsEditing(true)
                  setDraftEmail(student.email)
                  setDraftAcademicYear(student.academicYear)
                  setDraftImage(student.studentImage)
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
      </div>
      )}
      {isEditing && (
        <div className="student-component">
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label>Email</label>
              <div className="form-group">
                <input 
                  className='form-control'
                  type="text"
                  onChange={e=>setDraftEmail(e.target.value)}
                  value={draftEmail}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Academic Year</label>
              <div className="form-group">
                <input 
                  className='form-control'
                  type="text"
                  onChange={e=>setDraftAcademicYear(e.target.value)}
                  value={draftAcademicYear}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Image</label>
              <div className="form-group">
                <input 
                  type="file"
                  className='form-control'
                  onChange={e=>setDraftImage(e.target.files[0])}
                  name='studentImage'
                />
              </div>
            </div>
            <div className="buttons">
              <button 
                className='btn btn-outline-primary mr-3'
              >
                Save
              </button>
              <button 
                className='btn btn-outline-secondary'
                onClick={()=>{
                  setIsEditing(false)
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default StudentComponent