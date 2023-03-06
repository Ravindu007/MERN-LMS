import React from 'react'


import "../teachers/LessonView.scss"

const LessonView = ({lesson}) => {

  return (

    <div className="lessonView">
      <div className="row firstRow">
          <div className="col-10">
            <p><strong>Lesson Name: </strong>{lesson.lessonName}</p>
          </div>
          <div className="col-2">
            <a href={lesson.lessonFile} className="pdf-link" download target="_blank">
                <img src="/pdf-icon.png" alt="PDF Icon" style={{width:"50px", height:"50px"}} />
            </a>
          </div>
        </div>
      </div>
    )
    

}

export default LessonView