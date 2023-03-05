import React, { useState } from 'react'
import {useSignup} from "../../hooks/useSignup"

import "./auth.scss"

const Signup = () => {

  const {signup, error, isLoading} = useSignup()

  //input fiels
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async(e) => {
    e.preventDefault()

    //signup function of the signup hook
    await signup(email,password)
  }

  return (
    <div className="page">
      <div className="box">
        <form className='form' onSubmit={handleSubmit}>
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
          <button disabled={isLoading} className='btn btn-warning'>SIGNUP</button>
          {error && (
          <small>{error}</small>
          )}
        </form>
      </div>
    </div>
  )
}

export default Signup