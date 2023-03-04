import { useState } from "react";
import {useAuthContext} from "./useAuthContext"

export const useSignup = async() => {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const {dispatch} = useAuthContext()

  const signup = async(email,password) =>{
    setIsLoading(true)
    
    const response = await fetch("/api/users/signup",{
      method:"POST",
      body:JSON.stringify({email, password}),
      headers:{
        'ContentType':'application/json'
      }
    })

    //this will return the token
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