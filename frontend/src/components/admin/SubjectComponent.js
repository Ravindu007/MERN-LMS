import React from 'react'

const SubjectComponent = ({subject}) => {
  return (
    <div className="SubjectComponent">
      <div className="row">
        <div className="col-12">
          <p><strong>Subject Name: </strong>{subject.subjectName}</p>
          <p><strong>Taught by: </strong>{subject.taughtBy}</p>
          <p><strong>Number of Students: </strong>{subject.numberOfStudents}</p>
        </div>
      </div>
    </div>
  )
}

export default SubjectComponent