import React, { useState } from 'react'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { useLessonContext } from '../../../hooks/useLessonContext'

const LessonsForm = ({relatedSubject}) => {

  const {user} = useAuthContext()
  const {lessons, dispatch} = useLessonContext()

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

    if(response.ok){
      dispatch({type:"CREATE_LESSON", payload:json})
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Lesson Name</label>
        <input 
          type="text" 
          className='form-control'
          onChange={e=>{setLessonName(e.target.value)}}
          value={lessonName}
        />
      </div>
      <div className="form-group">
        <label>Lesson File</label>
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