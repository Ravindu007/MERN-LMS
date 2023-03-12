import React, { useState } from 'react'
import {useAuthContext} from "../../../../../../../hooks/useAuthContext"
import {useSubmissionContext} from "../../../../../../../hooks/useSubmissionContext"

const EvaluateForm = ({submission, showing, refresh}) => {

  const {user} = useAuthContext()
  const {submissions, dispatch} = useSubmissionContext()

  const [submissionMarks, setSubmissionMarks] = useState("")

  const updateMarks = async(e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('marks', submissionMarks)

    const response = await fetch("/api/lmsUsers/getSubmissions/" + submission._id,{
      method:"PATCH",
      body:formData,
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })
    const json = await response.json()
    if(response.ok){
      dispatch({type:"UPDATE_SUBMISSION", payload:json})
      showing(false)
      refresh(true)
    }
  }
  return (
    <form onSubmit={updateMarks}>
      <div className="form-group">
        <label>Marks</label>
        <select
          className='form-select'
          onChange={e=>{setSubmissionMarks(e.target.value)}}
          value={submissionMarks}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      <button className='btn btn-success'>SUBMIT</button>
    </form>
  )
}

export default EvaluateForm