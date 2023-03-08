import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { useSubjectContext } from '../../../hooks/useSubject'
import LessonsForm from './LessonsForm'
import LessonView from './LessonView'
import {useLessonContext} from "../../../hooks/useLessonContext"
import AssignmentForm from './Assignments/AssignmentForm'
import { useAssignmentContext } from '../../../hooks/useAssignmentContext'
import AssigmentItem from './Assignments/AssigmentItem'

const SeperateSubjectView = () => {

  const {user} = useAuthContext()
  const {subjects:singleSubject, dispatch} = useSubjectContext()
  const {lessons, dispatch:dispatchLesson} = useLessonContext()
  const {assignments, dispatch:dispatchAssignment} = useAssignmentContext()


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
        setisLoading(false)
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

    const fetchAllRelatedAssignments = async() => {
      const response = await fetch(`/api/lmsUsers/teacher/getRelatedAssignments?subjectId=${singleSubject._id}`,{
        headers:{
          'Authorization':`${user.email} ${user.token}`
        }
      })

      const json = await response.json()
      if(response.ok){
        dispatchAssignment({type:"GET_ALL_ASSIGNMENTS",payload:json})
      }
    }

    fetchRelatedSubject()
    fetchAllRelatedLessons()
    fetchAllRelatedAssignments()
  },[dispatch, user, id])


  const [showForm, setShowForm] = useState(false);
  const [showList, setShowList] = useState(false)

  const handleRowClick = () => {
    setShowForm(!showForm);
  }
  
const handleShowList = () =>{
  setShowList(!showList)
}

  return (
    <div className='seperateSubjectView'>
      <div className="row">
      <div className="lessons col-7">
        {/* fetch lessons related to this subject id */}
        {isLoading ? <p>LOADING....</p> :(
          lessons && lessons.map((lesson)=>(
            <LessonView key={lesson._id} lesson={lesson}/>
          ))
        )}
      </div>
      <div className="create-lesson col-5">
        <div className="row">
          <div className="col-12  lesson-form">
            {/* lessons form  when saving lessons save the subject id in the lessons doc*/}
            {isLoading ? <p>LOADING...</p> : (
              <LessonsForm relatedSubject={singleSubject}/>
            )}
          </div>

          {/* ASSIGNEMNT TAB */}
          {isLoading ? <p>LOADING</p> : (
            <>
            <div className="co-12 assignment-tab mt-5" style={{display:"flex", flexDirection:"column"}}>
            <p>Assignment Tab</p>
            <button onClick={handleRowClick} className='btn btn-warning'>Assignmnt-Form</button>
              {showForm && (
                  <div className="col-12 assignment-form">
                    <AssignmentForm subject={singleSubject}/> 
                  </div>
              )}
            <button onClick={handleShowList} className='btn btn-info'>Assignmnt List</button>
              {showList && (
                <div className="col-12 assignment-list">
                  {assignments && assignments.map((assignment)=>(
                    <AssigmentItem assignment={assignment}/>
                  ))}
                </div>  
              )}
            </div>
          </>
          )}
          </div>
        </div>
        </div>  
      </div>
  )
}

export default SeperateSubjectView