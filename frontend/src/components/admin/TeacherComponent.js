import React, { useState } from 'react'

import "./TeacherComponent.scss"

const TeacherComponent = ({teacher}) => {

  const [isEditing, setIsEditing] = useState(false)

  //fields that could change
  const[draftEmail, setDraftEmail] = useState("")
  const[draftPhoneNumber, setDraftPhoneNumber] = useState("")
  const[draftDepartment, setDraftDepartment] = useState("")
  const[draftSubject, setDraftSubject] = useState("")
  const[draftImage, setDraftImage] = useState(null)

  const handleUpdate = async(e) =>{
    e.preventDefault()

    const formData = new FormData()
    formData.append('email', draftEmail)
    formData.append('phoneNumber', draftPhoneNumber)
    formData.append('department', draftDepartment)
    formData.append('subject', draftSubject)
    formData.append('teacherImage', draftImage)


    const response = await fetch("/api/admin/users/teachers/" + teacher._id,{
      method:"PATCH",
      body:formData
    })

    const json = await response.json()

    if(response.ok){
      setIsEditing(false)
      setDraftEmail("")
      setDraftPhoneNumber("")
      setDraftDepartment("")
      setDraftSubject("")
      setDraftImage(null)
    }
  }

  const handleDelete = async() => {

  }


  return (
    <>
      {!isEditing && (
        <div className='card teacher-component'>
        <div className="card-body inside">
          <div className="col-7">
            <p><strong>Full Name: </strong>{teacher.fullName}</p>
            <p><strong>First Name: </strong>{teacher.firstName}</p>
            <p><strong>Last Name: </strong>{teacher.lastName}</p>
            <p><strong>Email: </strong>{teacher.email}</p>
            <p><strong>Phone Number: </strong>{teacher.phoneNumber}</p>
            <p><strong>User role: </strong>{teacher.userRole}</p>
            <p><strong>Department: </strong>{teacher.department}</p>
            <p><strong>Subject: </strong>{teacher.subject}</p>
          </div>
          <div className="col-5 img-part">
            <img src={teacher.teacherImage ? `${teacher.teacherImage}`:"/fallback.jpg"} className="mx-auto d-block img-fluid" />
            <div className="buttons">
              <button 
                onClick={()=>{
                  setIsEditing(true)
                  setDraftEmail(teacher.email)
                  setDraftPhoneNumber(teacher.phoneNumber)
                  setDraftDepartment(teacher.department)
                  setDraftSubject(teacher.subject)
                }} 
                className='btn btn-outline-success'>Update</button>
              <button onClick={handleUpdate} className='btn btn-outline-danger'>Delete</button>
            </div>
          </div>
        </div>
        </div>
      )}
      {isEditing && (
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="text"
              className='form-control'
              onChange={e=>{setDraftEmail(e.target.value)}}
              value={draftEmail}
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input 
              type="text"
              className='form-control'
              onChange={e=>{setDraftPhoneNumber(e.target.value)}}
              value={draftPhoneNumber}
            />
          </div>
          <div className="form-group">
            <label>Department</label>
            <input 
              type="text"
              className='form-control'
              onChange={e=>{setDraftDepartment(e.target.value)}}
              value={draftDepartment}
            />
          </div>
          <div className="form-group">
            <label>Subject</label>
            <input 
              type="text"
              className='form-control'
              onChange={e=>{setDraftSubject(e.target.value)}}
              value={draftSubject}
            />
          </div>
          <div className="form-group">
            <label>Photo</label>
            <input 
              type="file"
              className='form-control'
              name='teacherImage'
              onChange={e=>{setDraftImage(e.target.files[0])}}
            />
          </div>
          <div className="form-buttons">
            <button className='btn btn-outline-primary'>Save</button>
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
      )}
    </>
  )
}

export default TeacherComponent