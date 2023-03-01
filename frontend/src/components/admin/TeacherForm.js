import React, { useState } from 'react'

const TeacherForm = () => {

  //input fields
  const [fullName, setFullName] = useState("")
  const [firstName, setFirstName] = useState("") 
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phoneNumber,setPhoneNumber] = useState("")
  const [userRole,setUserRole] = useState("")
  const [department,setDepartment] = useState("")
  const [subject, setSubject] = useState("")
  const [image, setImage] = useState(null)

  const addTeacher = async(e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('fullName',fullName)
    formData.append('firstName',firstName)
    formData.append('lastName',lastName)
    formData.append('email',email)
    formData.append('phoneNumber',phoneNumber)
    formData.append('userRole',userRole)
    formData.append('department',department)
    formData.append('subject',subject)
    formData.append('teacherImage', image)

    const response = await fetch("/api/admin/users/teachers",{
      method:"POST",
      body:formData
    })

    const json = await response.json()

    if(response.ok){
      console.log("new user added",json);
      setFullName("")
      setFirstName("")
      setLastName("")
      setEmail("")
      setPhoneNumber("")
      setUserRole("")
      setDepartment("")
      setSubject("")
    }
  }

  return (
    <div className="teacher-form">
      <form onSubmit={addTeacher}>
        <div className="form-group">
          <label>Full Name</label>
          <input 
            className='form-control'
            type="text"
            onChange={e=>{setFullName(e.target.value)}}
            value={fullName}
          />
        </div>
        <div className="form-group">
          <label>First Name</label>
          <input 
            className='form-control'
            type="text"
            onChange={e=>{setFirstName(e.target.value)}}
            value={firstName}
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input 
            className='form-control'
            type="text"
            onChange={e=>{setLastName(e.target.value)}}
            value={lastName}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
            className='form-control'
            type="email"
            onChange={e=>{setEmail(e.target.value)}}
            value={email}
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input 
            className='form-control'
            type="text"
            onChange={e=>{setPhoneNumber(e.target.value)}}
            value={phoneNumber}
          />
        </div>
        <div className="form-group">
          <label>User Role</label>
          <select 
            className="form-select" 
            onChange={e=>{setUserRole(e.target.value)}}
            value={userRole}
          >
            <option>Select</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
        </select>
        </div>
        <div className="form-group">
          <label>Department</label>
          <input 
            className='form-control'
            type="text"
            onChange={e=>{setDepartment(e.target.value)}}
            value={department}
          />
        </div>
        <div className="form-group">
          <label>Subject</label>
          <input 
            className='form-control'
            type="text"
            onChange={e=>{setSubject(e.target.value)}}
            value={subject}
          />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input 
            className='form-control'
            type="file"
            name="teacherImage"
            onChange={e=>{setImage(e.target.files[0])}}
          />
        </div>
        <button className='btn btn-outline-primary'>Add Teacher</button>
      </form>
    </div>
  )
}

export default TeacherForm