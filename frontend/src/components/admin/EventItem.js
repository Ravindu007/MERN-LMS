import React, { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useEventContext } from '../../hooks/useEventContext'

const EventItem = ({event}) => {
  const {user} = useAuthContext()
  const {events, dispatch} = useEventContext()

  const [isEditing, setIsEditing] = useState(false)

  // update fields
  const [draftEventName, setDraftEventName] = useState("")
  const [draftEventDetails, setDraftEventDetails] = useState("")
  const [draftImage, setDraftImage] = useState(null)

  const handleUpdate = async(e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('eventName', draftEventName)
    formData.append('eventDetails',draftEventDetails)
    formData.append('eventImage',draftImage)

    const response = await fetch("/api/admin/events/" + event._id , {
      method:"PATCH",
      body:formData,
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })
    const json = await response.json()
    if(response.ok){
      dispatch({type:"UPDATE_EVENT", payload:json})
      setIsEditing(false)
    }
  }

  const handleDelete = async(e) => {
    const response = await fetch("/api/admin/events/"+event._id,{
      method:"DELETE",
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })

    const json = await response.json()

    if(response.ok){
      dispatch({type:"DELETE_EVENT", payload:json})
    }
  }

  return (
   <>
    {!isEditing && (
      <div className="eventItem" style={{border:"0.2px solid black"}}>
      <div className="row">
        <div className="col-8 details-part">
          <p><strong>Event Name: </strong>{event.eventName}</p>
          <p><strong>Event Details: </strong>{event.eventDetails}</p>
        </div>
        <div className="col-4 img-part" style={{display:"flex",flexDirection:"column", justifyContent:"center"}}>
          <img src={event.eventImage} alt={event.eventImage} className='mx-auto d-blcok img-fluid'/>
          <div className="buttons mt-4" style={{display:"flex", justifyContent:"space-evenly"}}>
            <button 
              className='btn btn-outline-success'
              onClick={()=>{
                setIsEditing(true)
                setDraftEventName(event.eventName)
                setDraftEventDetails(event.eventDetails)
                setDraftImage(event.eventImage)
              }}
              >
                UPDATE
              </button>
            <button className='btn btn-outline-danger' onClick={handleDelete}>DELETE</button>
          </div>
        </div>
      </div>
    </div>
    )}
    {isEditing && (
      <form onSubmit={handleUpdate} style={{border:"0.2px solid black"}}>
        <div className="form-group">
          <label>Event Name</label>
          <input 
            type="text"
            className='form-control'
            onChange={e=>{setDraftEventName(e.target.value)}}
            value={draftEventName} 
          />
        </div>
        <div className="form-group">
          <label>Event Details</label>
          <textarea 
            type="text"
            className='form-control'
            onChange={e=>{setDraftEventDetails(e.target.value)}}
            value={draftEventDetails} 
          />
        </div>
        <div className="form-group">
          <label>Event Image</label>
          <input 
            type="file"
            className='form-control'
            onChange={e=>{setDraftImage(e.target.files[0])}}
            name='eventImage'
          />
        </div>
        <div className="buttons">
          <button className='btn btn-info'>SAVE</button>
          <button 
            className='btn btn-secondary'
            onClick={()=>{
              setIsEditing(false)
            }}
            >
              CANCEL
            </button>
        </div>
      </form>
    )}
   </>
  )
}

export default EventItem