import React, { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

import "./auth.scss"

const Signup = () => {

  const {login, error, isLoading} = useLogin()

  //input fiels
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async(e) => {
    e.preventDefault()
    await login(email,password) 
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
          <button disabled={isLoading} className='btn btn-primary'>LOGIN</button>
          {error && (
          <small>{error}</small>
          )}
        </form>
      </div>
    </div>
  )
}

export default Signup