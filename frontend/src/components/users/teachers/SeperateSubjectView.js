import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '../../../hooks/useAuthContext'
import { useSubjectContext } from '../../../hooks/useSubject'

const SeperateSubjectView = () => {

  const {user} = useAuthContext()
  const {subjects:singleSubject, dispatch} = useSubjectContext()

  const {id} = useParams()

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

    fetchRelatedSubject()
  },[dispatch, user, id])
  return (
    <div className='seperateSubjectView'>
      {/* we want to get , post , patch , delete lessons related to this subject id */}
      <p>{singleSubject._id}</p>
      <div className="lessons col-7">
        {/* fetch lessons related to this subject id */}
      </div>
      <div className="create-lesson col-5">
        {/* lessons form  when saving lessons save the subject id in the lessons doc*/}
      </div>  
    </div>
  )
}

export default SeperateSubjectView