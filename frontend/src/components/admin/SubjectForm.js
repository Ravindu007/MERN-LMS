import React, {useState} from 'react'
import { useSubjectContext } from '../../hooks/useSubject'
import {useAuthContext} from "../../hooks/useAuthContext"

const SubjectForm = () => {

  const {user} = useAuthContext()
  const {dispatch} = useSubjectContext()

  //form input fiels
  const [subjectName, setSubjectName] = useState("")
  const [numberOfStudents, setNumberOfStudents] = useState("")

  const handleSubmit = async(e) => {
    e.preventDefault()

    if(!user){
      throw Error("You have to logged in")
    }

    const formData = new FormData()
    formData.append('subjectName',subjectName)
    formData.append('numberOfStudents',numberOfStudents)

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
          <label>Number of Students</label>
          <input 
            type="number"
            className='form-control'
            onChange={e=>{setNumberOfStudents(e.target.value)}}
            value={numberOfStudents}
          />
        </div>
        <button className='btn btn-outline-primary'>Add</button>
      </form>
    </div>
  )
}

export default SubjectForm