import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuthContext } from '../../../../hooks/useAuthContext'
import { useSubmissionContext } from '../../../../hooks/useSubmissionContext'
import SubmissionVIewStudent from './submissions/SubmissionVIewStudent'

//  components


const AllSubmissions = () => {
  const {user} = useAuthContext()
  const {submissions, dispatch} = useSubmissionContext()


  const [isLoading, setIsLoading] = useState(true)

  const location = useLocation()
  const assignmentId = new URLSearchParams(location.search).get('assignmnetId')


  // fetch all the submissions related to that assignment id and user email
  useEffect(()=>{
    const fetchAlltheRelatedSubmissions = async() => {
      const response  = await fetch(`/api/lmsUsers/getSubmissions/related?assignmentId=${assignmentId}&userEmail=${user.email}`,{
        headers:{
          'Authorization':`${user.email} ${user.token}`
        }
      })

      const json  = await response.json()
      if(response.ok){
        dispatch({type:"GET_ALL_SUBMISSIONS", payload:json})
        setIsLoading(false)
      }
    }

    if(user){
      fetchAlltheRelatedSubmissions()
    }
  },[])

  return (
    <div className="allSubmissions">
      <p><strong>Assignment Number: </strong>{assignmentId}</p>
      {isLoading ? <p>LOADING</p> : (
        submissions && submissions.map((submission)=>(
          <SubmissionVIewStudent key={submission._id} submission={submission}/>
        ))
      )}
    </div>
  )
}

export default AllSubmissions