import React from 'react'

const Subject = ({subject}) => {
  return (
    <div className="subject">
      <div className='card'>
        <div className="card-body">
            <p><strong>Subject Name: </strong>{subject.subjectName}</p>
            <p><strong>Taught by: </strong>{subject.taughtBy}</p>
            <p><strong>Taught by Email: </strong>{subject.taughtByEmail}</p>
            <p><strong>Number of Students: </strong>{subject.numberOfStudents}</p>
        </div>
        </div>
    </div>
  )
}

export default Subject