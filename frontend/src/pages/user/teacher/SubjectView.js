import React, { useEffect, useState } from 'react'
import Subject from '../../../components/users/teachers/Subject'
import {useAuthContext} from "../../../hooks/useAuthContext"
import {useSubjectContext} from "../../../hooks/useSubject"

const SubjectView = () => {

  const {user} = useAuthContext()
  const {subjects, dispatch} = useSubjectContext()


  //loading state
  const [isLoading, setIsLoading] = useState(true)

  //fetch subjetcs related to email
  useEffect(()=>{

    const fetchRelatedSubject = async() => {
      const response = await fetch("/api/lmsUsers/teacher/getRealtedSubjects",{
        headers:{
          'Authorization':`${user.email} ${user.token}`
        }
      })

      const json = await response.json()

      if(response.ok){
        dispatch({type:'GET_SINGLE_SUBJECT', payload:json})
        setIsLoading(false)
      }
    }

    fetchRelatedSubject()
  },[dispatch, user])

  return (
    <div className="subjectView">
      <div className="row">
          {isLoading ? <p>LOADING</p> : (
            subjects && subjects.map((subject)=>(
              <div key={subject._id} className="col-6">
                <Subject subject={subject}/>
              </div>
            ))
          )}
      </div>
    </div>
  )
}

export default SubjectView