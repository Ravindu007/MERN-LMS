import React, { useState } from 'react'
import { useLmsUserContext } from '../../hooks/useLmsUser'
import {useAuthContext} from "../../hooks/useAuthContext"

const StudentForm = () => {
  const {user} = useAuthContext()
  const {dispatch} = useLmsUserContext()

  //input fields
  const [registrationNumber, setRegistrationNumber] = useState("")
  const [fullName, setFullName] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [department, setDepartment] = useState("")
  const [studentImage, setStudentImage] = useState(null)

  const handleSubmit = async(e) => {
    e.preventDefault()

    if(!user){
      throw Error("You should logged in first")
    }

    const formData = new FormData()
    formData.append('fullName', fullName)
    formData.append('registrationNumber', registrationNumber)
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('email', email)
    formData.append('department', department)
    formData.append('studentImage', studentImage)

    const response = await fetch("/api/admin/lmsUsers/students",{
      method:"POST",
      body:formData,
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })

    const json = await response.json()

    if(response.ok){
      dispatch({type:'CREATE_LMSUSER', payload:json})
      setFullName("")
      setFirstName("")
      setLastName("")
      setRegistrationNumber("")
      setEmail("")
      setDepartment("")
      setStudentImage(null)
    }
  }

  return (
    <div className='student-form'>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            className='form-control'
            onChange={e=>setFullName(e.target.value)}
            value={fullName}
          />
        </div>
        <div className="form-group">
          <label>First Name</label>
          <input 
            type="text" 
            className='form-control'
            onChange={e=>setFirstName(e.target.value)}
            value={firstName}
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input 
            type="text" 
            className='form-control'
            onChange={e=>setLastName(e.target.value)}
            value={lastName}
          />
        </div>
        <div className="form-group">
          <label>Registration Number</label>
          <input 
            type="text" 
            className='form-control'
            onChange={e=>setRegistrationNumber(e.target.value)}
            value={registrationNumber}
          />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input 
            type="text" 
            className='form-control'
            onChange={e=>setDepartment(e.target.value)}
            value={department}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="text" 
            className='form-control'
            onChange={e=>setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input 
            type="file" 
            className='form-control'
            onChange={e=>setStudentImage(e.target.files[0])}
            name='studentImage'
          />
        </div>
        <button className='btn btn-outline-primary'>ADD</button>
      </form>
    </div>
  )
}

export default StudentForm