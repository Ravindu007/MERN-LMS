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
  const [academicYear, setAcademicYear] = useState("")
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
    formData.append('academicYear',academicYear)
    formData.append('userRole','student')
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


    //also save the user in the commpn user collection
    const formData2 = new FormData()
    formData2.append('fullName',fullName)
    formData2.append('email',email)
    formData2.append('userRole','student')

    const response2 = await fetch("/api/admin/lmsUser/commonUser",{
      method:"POST",
      body:formData2,
      headers:{
        'Authorization' : `${user.email} ${user.token}`
      }
    })

    const json2 = await response2.json2()
    if(response2.ok){
      //console.log(json2);
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
          <label>Academic Year</label>
          <input 
            type="text" 
            className='form-control'
            onChange={e=>setAcademicYear(e.target.value)}
            value={academicYear}
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