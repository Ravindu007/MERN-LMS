import React from 'react'
import { Link } from 'react-router-dom'

const Subject = ({subject}) => {
  return (
    <div className="subject">
      <div className='card'>
        <div className="card-body" style={{display:"flex"}}>
            <div className="col-9">
              <p><strong>subject id: </strong>{subject._id}</p>
              <p><strong>Subject Name: </strong>{subject.subjectName}</p>
              <p><strong>Taught by: </strong>{subject.taughtBy}</p>
              <p><strong>Taught by Email: </strong>{subject.taughtByEmail}</p>
              <p><strong>Number of Students: </strong>{subject.numberOfStudents}</p>
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

export default Subject