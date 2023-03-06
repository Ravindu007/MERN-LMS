import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { useSubjectContext } from '../../../hooks/useSubject'
import LessonsForm from './LessonsForm'

const SeperateSubjectView = () => {

  const {user} = useAuthContext()
  const {subjects:singleSubject, dispatch} = useSubjectContext()

  const {id} = useParams()


  // lessons
  const [lessons,setLessons] = useState([])

  //fetching the subject related to that id
  useEffect(()=>{
    const fetchRelatedSubject = async() => {
      const response = await fetch("/api/lmsUsers/teacher/getRealtedSubjects/" + id,{
        headers:{
          'Authorization':`${user.email} ${user.token}`
        }
      })

      const json = await response.json()

      if(response.ok){
        dispatch({type:'GET_SINGLE_SUBJECT', payload:json})
      }
    }

    const fetchAllRelatedLessons = async() => {
      const response = await fetch(`/api/lmsUsers/teacher/allRelatedLessons?id=${id}`, {
        headers: {
          'Authorization': `${user.email} ${user.token}`
        }
      });
      const json = await response.json()

      if(response.ok){
        setLessons(json)
      }
    }

    fetchRelatedSubject()
    fetchAllRelatedLessons()
  },[dispatch, user, id])
  return (
    <div className='seperateSubjectView'>
      <div className="row">
      <div className="lessons col-7">
        {/* fetch lessons related to this subject id */}
        {lessons && lessons.map((lesson)=>(
          <p key={lesson._id}>{lesson.lessonName}</p>
        ))}
      </div>
      <div className="create-lesson col-5">
        {/* lessons form  when saving lessons save the subject id in the lessons doc*/}
        <LessonsForm relatedSubject={singleSubject}/>
      </div>  
      </div>
    </div>
  )
}

export default SeperateSubjectView