import React, {useState} from 'react'
import { useSubjectContext } from '../../hooks/useSubject'
import {useAuthContext} from "../../hooks/useAuthContext"

const SubjectForm = () => {

  const {user} = useAuthContext()
  const {dispatch} = useSubjectContext()

  //form input fiels
  const [subjectName, setSubjectName] = useState("")
  const [taughtBy, setTaughtBy] = useState("")
  const [taughtByEmail, setTaughtByEmail] = useState("")
  const [numberOfStudents, setNumberOfStudents] = useState("")
  const [academicYear, setAcademicYear] = useState("")
  const [department, setDepartment] = useState("")


  const handleSubmit = async(e) => {
    e.preventDefault()

    if(!user){
      throw Error("You have to logged in")
    }

    const formData = new FormData()
    formData.append('subjectName',subjectName)
    formData.append('numberOfStudents',numberOfStudents)
    formData.append('taughtBy', taughtBy)
    formData.append('taughtByEmail', taughtByEmail)
    formData.append('academicYear',academicYear)
    formData.append('department',department)

    const response = await fetch("/api/admin/subjects",{
      method:'POST',
      body:formData,
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })
    const json = await response.json()

    if(response.ok){
      dispatch({type:'CREATE_SUBJECT', payload:json})
      setSubjectName("")
      setNumberOfStudents("")
    }
  }

  return (
    <div className='subjectForm'>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Subject Name</label>
          <input 
            type="text"
            className='form-control'
            onChange={e=>{setSubjectName(e.target.value)}}
            value={subjectName}
          />
        </div>
        <div className="form-group">
          <label>Taught By</label>
          <input 
            type="text"
            className='form-control'
            onChange={e=>{setTaughtBy(e.target.value)}}
            value={taughtBy}
          />
        </div>
        <div className="form-group">
          <label>Taught By Email</label>
          <input 
            type="text"
            className='form-control'
            onChange={e=>{setTaughtByEmail(e.target.value)}}
            value={taughtByEmail}
          />
        </div>
        <div className="form-group">
          <label>Number of Students</label>
          <input 
            type="number"
            className='form-control'
            onChange={e=>{setNumberOfStudents(e.target.value)}}
            value={numberOfStudents}
          />
        </div>
        <div className="form-group">
          <label>Academic Year</label>
          <input 
            type="text"
            className='form-control'
            onChange={e=>{setAcademicYear(e.target.value)}}
            value={academicYear}
          />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input 
            type="text"
            className='form-control'
            onChange={e=>{setDepartment(e.target.value)}}
            value={department}
          />
        </div>
        <button className='btn btn-outline-primary'>Add</button>
      </form>
    </div>
  )
}

export default SubjectForm