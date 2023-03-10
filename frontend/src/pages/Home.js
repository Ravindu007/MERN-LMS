import React, { useEffect } from 'react'

import {useAuthContext} from "../hooks/useAuthContext"
import {useEventContext} from "../hooks/useEventContext"

// components
import EventItem from "../components/users/all/EventItem"

const Home = () => {

  const {user} = useAuthContext()
  const {events, dispatch} = useEventContext()

  // fetching events
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

    fetchAllEvents()
  },[])


  return (
    <div className="home">
      <div className="container">
      <div className="row event-row mt-5">
          <div className="col-12 upcomingEvents" style={{display:"flex", flexWrap:"wrap"}}>
            {events && events.map((event)=>(
              <EventItem key={event._id} event={event}/>
            ))}
          </div>
        </div>
      </div>
      <div className="col-12 footer mt-5" style={{display:"flex", height:"120px", backgroundColor:"black", color:"white"}}>
          <div className="col-4">
            <h6>Contact us</h6>
            <p>
              Faculty of computing <br />
              University of ABC <br />
              TP: 012345678 <br />
              Email: FOCABCUNI@gmail.com
            </p>
          </div>
          <div className="col-4">
            <h6>About us</h6>
            <ul style={{listStyle:"none"}}>
              <li>Computing and Information Systems</li>
              <li>Software Engineering</li>
              <li>Data Sciences</li>
            </ul>
          </div>
          <div className="col-4">
            <h6>Quick links</h6>
            <p>Research Developments <br />
            Examination Branch <br />
            Student Affairs</p>
          </div>
        </div>
    </div>
  )
}

export default Home