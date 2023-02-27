import React from 'react'

const TeacherComponent = ({teacher}) => {
  return (
    <div className='teacher-component'>
      <p>{teacher.firstName}</p>
    </div>
  )
}

export default TeacherComponent