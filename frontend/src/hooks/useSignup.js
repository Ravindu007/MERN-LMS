import { useState } from "react";
import {useAuthContext} from "./useAuthContext"

export const useSignup = () => {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const {dispatch} = useAuthContext()

  const signup = async(email,password) =>{
    setError(null)
    setIsLoading(true)
    
    const response = await fetch('/api/user/signup',{
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({email, password})
    })

    //this will return the token + email
    const json = await response.json()

    if(!response.ok){
      setError(json.error)
      setIsLoading(false)
    }
    if(response.ok){
      setIsLoading(false)
      //save token into the local storage
      localStorage.setItem('user',JSON.stringify(json)) //json = email + token
      //dispatch login action
      dispatch({type:'LOGIN', payload:json})
    }
  }

  return {signup, error, isLoading}
}