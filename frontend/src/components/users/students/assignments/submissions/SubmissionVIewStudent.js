import React from 'react'

const SubmissionVIewStudent = ({submission}) => {
  return (
    <div className="submissionView" style={{display:"flex", justifyContent:"space-evenly", border:"0.2px solid black", padding:"5px", margin:"5px"}}>
      <p><strong>Registration Number: </strong>{submission.registrationNumber}</p>
      <p><strong>Uploaded at: </strong>{submission.createdAt}</p>
      <p><strong>Marks: </strong>{submission.marks}</p>
      <a href={submission.submissionFile} className="pdf-link" download target="_blank">
        <img src="/pdf-icon.png" alt="PDF Icon" style={{width:"50px", height:"50px"}} />
      </a>
    </div>
  )
}

export default SubmissionVIewStudent