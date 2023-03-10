
import React, { useEffect, useState } from 'react'
import TeacherComponent from '../../components/admin/TeacherComponent'
import TeacherForm from "../../components/admin/TeacherForm"

import {useLmsUserContext} from "../../hooks/useLmsUser"
import {useAuthContext} from "../../hooks/useAuthContext"



const TeacherTab = () => {
  const {user} = useAuthContext()
  const {lmsUsers, dispatch} = useLmsUserContext()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    const fetchALLTeachers = async() =>{
      const response = await fetch("/api/admin/lmsUsers/teachers",{
        headers:{
          'Authorization':`${user.email} ${user.token}`
        }
      })
      const json = await response.json()

      if(response.ok){
        dispatch({type:"SET_LMSUSERS", payload:json})
        setIsLoading(false)
      }
    }

    if(user){
      fetchALLTeachers()
    }
  },[dispatch, user])


  return (
    <div className="tab">
      <div className="row">
        <div className="col-8 items">
          {isLoading ? <p>LOADING...</p> : (
            lmsUsers && 
              lmsUsers.map((lmsUser)=>(
                  <TeacherComponent  key={lmsUser._id} teacher={lmsUser} />
              ))
          )}
        </div>
        <div className="col-4 add-item">
          <TeacherForm/>
        </div>
      </div>
    </div>
  )
}

export default TeacherTab