import React from 'react'
import { Link } from 'react-router-dom'

const TeacherSubject = ({subject}) => {
  return (
    <div className="subject">
      <div className='card'>
        <div className="card-body" style={{display:"flex"}}>
            <div className="col-9">
              <p><strong>Subject Name: </strong>{subject.subjectName}</p>
              <p><strong>Taught by: </strong>{subject.taughtBy}</p>
              <p><strong>Taught by Email: </strong>{subject.taughtByEmail}</p>
              <p><strong>Number of Students: </strong>{subject.numberOfStudents}</p>
              <p><strong>Academic Year: </strong>{subject.academicYear}</p>
              <p><strong>Department: </strong>{subject.department}</p>
            </div>
            <div className="col-3">
              <Link to={`/lmsUser/teacher/subjectView/view/${subject._id}`}>
                 <button className='btn btn-outline-success'>VIEW</button>
              </Link>
            </div>
        </div>
        </div>
    </div>
  )
}

export default TeacherSubject