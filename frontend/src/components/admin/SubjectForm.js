import React, {useState} from 'react'
import { useSubjectContext } from '../../hooks/useSubject'

const SubjectForm = () => {

  const {dispatch} = useSubjectContext()

  //form input fiels
  const [subjectName, setSubjectName] = useState("")
  const [taughtBy, setTaughtBy] = useState("")
  const [numberOfStudents, setNumberOfStudents] = useState("")

  const handleUpdate = async(e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('subjectName',subjectName)
    formData.append('taughtBy',taughtBy)
    formData.append('numberOfStudents',numberOfStudents)

    const response = await fetch("/api/admin/subjects",{
      method:'POST',
      body:formData
    })
    const json = await response.json()

    if(response.ok){
      dispatch({type:'CREATE_SUBJECT', payload:json})
    }
  }

  return (
    <div className='subjectForm'>
      <form onSubmit={handleUpdate}>
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