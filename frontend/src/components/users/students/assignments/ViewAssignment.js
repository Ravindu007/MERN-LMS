import React from 'react'
import { Link } from 'react-router-dom'

const ViewAssignment = ({assignment}) => {
  return (
    <div className="viewAssignment" style={{border:"0.2px solid black", display:"flex"}}>
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
      </div>
    </div>
  )
}

export default ViewAssignment