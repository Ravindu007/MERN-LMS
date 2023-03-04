import React, { useState } from 'react'

import "./auth.scss"

const Signup = () => {

  //input fiels
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="page">
      <div className="box">
        <form className='form'>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="text"
              className='form-control'
              onChange={e=>{setEmail(e.target.value)}}
              value={email}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="text"
              className='form-control'
              onChange={e=>{setPassword(e.target.value)}}
              value={password}
            />
          </div>
          <button className='btn btn-warning'>SIGNUP</button>
        </form>
      </div>
    </div>
  )
}

export default Signup