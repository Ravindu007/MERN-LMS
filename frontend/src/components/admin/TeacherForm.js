import React, { useState, useEffect } from 'react'
import { useLmsUserContext } from '../../hooks/useLmsUser'
import {useSubjectContext} from "../../hooks/useSubject"
import {useAuthContext} from "../../hooks/useAuthContext"


const TeacherForm = () => {

  const {user} = useAuthContext()
  const {dispatch} = useLmsUserContext()
  const {dispatch:dispatchSubject} = useSubjectContext()


  //fetch Subjects so we can select them
  const [subjectList, setSubjectList] = useState([])

  useEffect(()=>{
    const fetchAllSubjects = async() => {
      const response = await fetch("/api/admin/subjects",{
        headers:{
          'Authorization':`${user.email} ${user.token}`
        }
      })
      const json = await response.json()

      if(response.ok){
        setSubjectList(json)
      }
    }


    if(user){
      fetchAllSubjects()
    }
  },[user,])


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


  const [subjectId, setSubjectId] = useState("")

  const addTeacher = async(e) => {

    e.preventDefault()

    //adding new teacher to the database
    const formData1 = new FormData()
    formData1.append('fullName',fullName)
    formData1.append('firstName',firstName)
    formData1.append('lastName',lastName)
    formData1.append('email',email)
    formData1.append('phoneNumber',phoneNumber)
    formData1.append('userRole',userRole)
    formData1.append('department',department)
    formData1.append('subject',subject)
    formData1.append('teacherImage', image)

    const response1 = await fetch("/api/admin/lmsUsers/teachers",{
      method:"POST",
      body:formData1,
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })

    const json1 = await response1.json()

    if(response1.ok){
      dispatch({type:"CREATE_LMSUSER", payload:json1})
      setFullName("")
      setFirstName("")
      setLastName("")
      setEmail("")
      setPhoneNumber("")
      setUserRole("")
      setDepartment("")
      setSubject("")
    }


    //also want to update the subject
    const formData2 = new FormData()
    formData2.append('taughtBy', fullName)
    formData2.append('taughtByEmail', email)
    
    const response2 = await fetch("/api/admin/subjects/" + subjectId,{
      method:"PATCH",
      body:formData2,
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })

    const json2 = await response2.json()

    if(response2.ok){
      dispatchSubject({type:'UPDATE_SUBJECT',payload:json2})
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
          <select 
            className='form-select'
            value={department}
            onChange={e=>{setDepartment(e.target.value)}}
            >
              <option>Select</option>
              <option value="CIS">CIS</option>
              <option value="SE">SE</option>
              <option value="DS">DS</option>
          </select>
        </div>
        <div className="form-group">
          <label>Subject</label>
          <select 
            className="form-select" 
            onChange={e => {
              setSubject(e.target.value)
              const selectedSubject = subjectList.find(subject => subject.subjectName === e.target.value)
              setSubjectId(selectedSubject._id)
            }}
            value={subject}
          >
            <option>Select</option>
            {subjectList.map((subject, index) => (
              <option key={index} value={subject.subjectName}>{subject.subjectName}</option>
            ))}
        </select>
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