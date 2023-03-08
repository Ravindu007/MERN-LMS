import React from 'react'

const AssigmentItem = ({assignment}) => {
  
  return (
    <div className="assignmentItem" style={{border:"0.5px solid black"}}>
      <p><strong>Assigment Title: </strong>{assignment.assignmentTitle}</p>
      <p><strong>Deadline: </strong>{assignment.deadline}</p>
      <a href={assignment.assignmentFile} className="pdf-link" download target="_blank">
        <img src="/pdf-icon.png" alt="PDF Icon" style={{width:"50px", height:"50px"}} />
      </a>
      
    </div>
  )
}

export default AssigmentItem