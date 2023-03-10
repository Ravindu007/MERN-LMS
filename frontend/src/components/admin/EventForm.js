import React, { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useEventContext } from '../../hooks/useEventContext'

const EventForm = () => {

  const {user} = useAuthContext()
  const {dispatch} = useEventContext()

  const [eventName, setEventName] = useState("")
  const [eventDetails, setEventDetails] = useState("")
  const [eventImage, setEventImage] = useState(null)


  const handleSubmit = async(e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('eventName' , eventName)
    formData.append('eventDetails', eventDetails)
    formData.append('eventImage',eventImage)

    const response = await fetch("/api/admin/events",{
      method:"POST",
      body:formData,
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })
    const json  = await response.json()

    if(response.ok){
      dispatch({type:"CREATE_EVENT", payload:json})
      setEventName("")
      setEventDetails("")
      setEventImage(null)
    }
  }

  return (
    <div className="eventForm">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Event Name</label>
          <input 
            type="text"
            className='form-control'
            onChange={e=>{setEventName(e.target.value)}} 
            value={eventName}
          />
        </div>
        <div className="form-group">
          <label>Event Details</label>
          <textarea 
            type="text"
            className='form-control'
            onChange={e=>{setEventDetails(e.target.value)}} 
            value={eventDetails}
          />
        </div>
        <div className="form-group">
          <label>Event Image</label>
          <input 
            type="file"
            className='form-control'
            onChange={e=>{setEventImage(e.target.files[0])}}
            name='eventImage' 
          />
        </div>
        <button className='btn btn-outline-info'>ADD</button>
      </form>
    </div>
  )
}

export default EventForm