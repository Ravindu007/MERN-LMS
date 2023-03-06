import React from 'react'


import "./LessonView.scss"

const LessonView = ({lesson}) => {
  return (
    <div className="lessonView col-12">
      <p><strong>Lesson Name: </strong>{lesson.lessonName}</p>
      <a href={lesson.lessonFile} className="pdf-link" download target="_blank">
          <img src="/pdf-icon.png" alt="PDF Icon" style={{width:"50px", height:"50px"}} />
      </a>
    </div>
  )
}

export default LessonView