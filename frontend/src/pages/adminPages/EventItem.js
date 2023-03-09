import React from 'react'

const EventItem = ({event}) => {
  return (
    <div className="eventItem">
      <p><strong>Event Name: </strong>{event.eventName}</p>
      <p><strong>Event Details: </strong>{event.eventDetails}</p>
    </div>
  )
}

export default EventItem