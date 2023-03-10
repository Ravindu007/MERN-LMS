import React from 'react'

const EventItem = ({event}) => {
  return (
    <div className="card col-4" style={{border:"0.2px solid black"}}>
      <div className="card-body">
        <img src={event.eventImage} className='max-auto d-block img-fluid' />
        <p><strong>Event Name: </strong>{event.eventName}</p>
        <p><strong>Event Details: </strong>{event.eventDetails}</p>
      </div>
    </div>
  )
}

export default EventItem