import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { useSubjectContext } from '../../../hooks/useSubject'
import {useLessonContext} from "../../../hooks/useLessonContext"


import LessonViewStudent from "./LessonViewStudent"

const SeperateSubjectStudentView = () => {

  const {user} = useAuthContext()
  const {subjects:singleSubject, dispatch} = useSubjectContext()
  const {lessons, dispatch:dispatchLesson} = useLessonContext()

  const {id} = useParams()


  const [isLoading ,setisLoading] = useState(true)

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
        dispatchLesson({type:"GET_ALL_LESSONS", payload:json})
        setisLoading(false)
      }
    }

    fetchRelatedSubject()
    fetchAllRelatedLessons()
  },[dispatch, user, id])
  
  return (
    <div className='seperateSubjectView'>
      <div className="row">
      <div className="lessons col-12">
        {/* fetch lessons related to this subject id */}
        {isLoading ? <p>LOADING....</p> :(
          lessons && lessons.map((lesson)=>(
            <LessonViewStudent key={lesson._id} lesson={lesson}/>
          ))
        )}
      </div>  
      </div>
    </div>
  )
}

export default SeperateSubjectStudentView