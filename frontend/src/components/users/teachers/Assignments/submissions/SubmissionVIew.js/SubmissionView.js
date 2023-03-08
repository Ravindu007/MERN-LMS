import React from 'react'

const SubmissionView = ({submission}) => {
  return (
    <div className="submissionView" style={{display:"flex", justifyContent:"space-evenly", border:"0.2px solid black"}}>
      <p><strong>Registration Number: </strong>{submission.registrationNumber}</p>
      <p><strong>Uploaded at: </strong>{submission.createdAt}</p>
      <a href={submission.submissionFile} className="pdf-link" download target="_blank">
        <img src="/pdf-icon.png" alt="PDF Icon" style={{width:"50px", height:"50px"}} />
      </a>
    </div>
  )
}

export default SubmissionView