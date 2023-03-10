import React, { useEffect } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useEventContext } from '../../hooks/useEventContext'
import EventForm from '../../components/admin/EventForm'
import EventItem from '../../components/admin/EventItem'

const EventTab = () => {
    const {user} = useAuthContext()
    const {events, dispatch} = useEventContext()

  //fetching events
  useEffect(()=>{
    const fetchAllEvents = async() => {
      const response  = await fetch("/api/admin/events",{
        headers:{
          'Authorization':`${user.email} ${user.token}`
        }
      })
      const json  = await response.json()

      if(response.ok){
        dispatch({type:"GET_ALL_EVENTS", payload:json})
      }
    }

    if(user){
      fetchAllEvents()
    }
  },[])

  return (
    <div className="eventTab">
      <div className="row">
        <div className="col-8 events">
          {events && events.map((event)=>(
            <EventItem key={event._id} event={event}/>
          ))}
        </div>
        <div className="col-4 eventForm">
          <EventForm/>
        </div>
      </div>
    </div>
  )
}

export default EventTab