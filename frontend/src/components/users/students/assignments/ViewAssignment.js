import React , {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import { useAuthContext } from "../../../../hooks/useAuthContext"
import {useSubmissionContext} from "../../../../hooks/useSubmissionContext"

const ViewAssignment = ({assignment}) => {

  const {user} = useAuthContext()

  const [isLoading , setIsLoading] = useState(true)
  const [submissionStatus, setSubmissionStatus] = useState("")

  // fetching already existing records IF THERE ARE ALREADY SUBMISSIONS
  useEffect(()=>{
    const fetchRelatedSubmissions = async() => {
      const response = await fetch(`/api/lmsUsers/getSubmissions/related?userEmail=${user.email}&assignmentId=${assignment._id}` ,{
        headers:{
          'Authorization':`${user.email} ${user.token}`
        }
      })

      const json = await response.json()
      if(response.ok){
        if (Array.isArray(json) && json.length === 0) {
          // Empty array
          setSubmissionStatus(false);
        } else {
          // Non-empty array or object
          setSubmissionStatus(true);
        }
        setIsLoading(false)
      }
    }

    if(user){
      fetchRelatedSubmissions()
    }
  },[user])

  return (
    <div className="viewAssignment" style={{border:"0.2px solid black", display:"flex", margin:"10px"}}>
      <div className="col-10">
          <p><strong>Assignment title: </strong>{assignment.assignmentTitle}</p>
          <p><strong>Assignment Deadline: </strong>{assignment.deadline}</p>
          <a href={assignment.assignmentFile} className="pdf-link" download target="_blank">
              <img src="/pdf-icon.png" alt="PDF Icon" style={{width:"50px", height:"50px"}} />
          </a>
      </div>
      <div className="col-2">
        <Link to={`/lmsUser/student/subjectView/assignments/${assignment._id}`}>
          <button className='btn btn-success'>ADD A SUBMISSION</button>
        </Link>
        {/* submission status */}
        <p>Previous submissions:{isLoading ? <strong>LOADING</strong> :(submissionStatus === true ? <strong>YES</strong> : <strong>NO</strong>)}</p>
      </div>
    </div>
  )
}

export default ViewAssignment