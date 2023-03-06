import React, { useState } from 'react'
import {useAuthContext} from "../../../hooks/useAuthContext"
import {useLessonContext} from "../../../hooks/useLessonContext"

import "./LessonView.scss"

const LessonView = ({lesson}) => {

  const {user} = useAuthContext()
  const {lessons, dispatch} = useLessonContext()

  const [isEditing, setIsEditing] = useState(false)

  // update fields
  const [draftLessonName, setDraftLessonName] = useState("")
  const [draftLessonFile, setDraftLessonFile] = useState(null)

  const handleUpdate = async(e) => {
    e.preventDefault()


    const formData = new FormData()
    formData.append('lessonName',draftLessonName)
    formData.append('lessonFile',draftLessonFile)

    const response = await fetch("/api/lmsUsers/teacher/allRelatedLessons/" + lesson._id,{
      method:"PATCH",
      body:formData,
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })

    const json = await response.json()

    if(response.ok){
      dispatch({type:"UPDATE_LESSON", payload:json})
      setIsEditing(false)
      setDraftLessonName("")
      setDraftLessonFile(null)
    }
  }

  const handleDelete = async(e) =>{
    e.preventDefault()

    const response = await fetch("/api/lmsUsers/teacher/allRelatedLessons/" + lesson._id,{
      method:"DELETE",
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })

    const json = await response.json()

    if(response.ok){
      dispatch({type:"DELETE_LESSON", payload:json})
    }
  }
  
  return (
    <>
    {!isEditing && (
      <div className="lessonView">
        <div className="row firstRow">
          <div className="col-10">
            <p><strong>Lesson Name: </strong>{lesson.lessonName}</p>
          </div>
          <div className="col-2">
            <a href={lesson.lessonFile} className="pdf-link" download target="_blank">
                <img src="/pdf-icon.png" alt="PDF Icon" style={{width:"50px", height:"50px"}} />
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <button 
              className='btn btn-outline-success'
              onClick={()=>{
                setIsEditing(true)
                setDraftLessonName(lesson.lessonName)
                setDraftLessonFile(lesson.lessonFile)
              }}
            >
              UPDATE
            </button>
            <button 
              className='btn btn-outline-danger'
              onClick={handleDelete}
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
    )}
    {isEditing && (
      <form onSubmit={handleUpdate} style={{border:"0.3px solid black"}}>
        <div className="form-group">
          <label>Lesson Name</label>
          <input 
            type="text"
            onChange={e=>{setDraftLessonName(e.target.value)}} 
            value={draftLessonName}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Lesson File</label>
          <input 
            type="file"
            onChange={e=>{setDraftLessonFile(e.target.files[0])}} 
            className="form-control"
            name="lessonFile"
          />
        </div>
        <div className="buttons">
          <button className='btn btn-outline-primary mr-3'>SAVE</button>
          <button className='btn btn-outline-secondary' onClick={()=>{setIsEditing(false)}}>CANCEL</button>
        </div>
      </form>
    )}
    </>
  )
}

export default LessonView