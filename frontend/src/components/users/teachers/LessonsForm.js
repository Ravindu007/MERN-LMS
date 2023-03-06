import React, { useState } from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext'

const LessonsForm = ({relatedSubject}) => {

  const {user} = useAuthContext()


  const subjectId = relatedSubject._id
  const [lessonName, setLessonName] = useState("")
  const [lessonFile, setLessonFile] = useState(null)


  const handleSubmit = async(e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('subjectId', subjectId)
    formData.append('lessonName', lessonName)
    formData.append('lessonFile', lessonFile)

    const response = await fetch("/api/lmsUsers/teacher/allRelatedLessons",{
      method:'POST',
      body:formData,
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })

    const json = await response.json()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Leeson Name</label>
        <input 
          type="text" 
          className='form-control'
          onChange={e=>{setLessonName(e.target.value)}}
          value={lessonName}
        />
      </div>
      <div className="form-group">
        <label>Leeson File</label>
        <input 
          type="file" 
          className='form-control'
          onChange={e=>{setLessonFile(e.target.files[0])}}
          name="lessonFile"
        />
      </div>
      <button className='btn btn-outline-primary'>ADD</button>
    </form>
  )
}

export default LessonsForm