import {useAuthContext} from "./useAuthContext"
import {useNavigate} from "react-router-dom"
import { useSubjectContext } from "./useSubject"

export const useLogout = () => {
  const navigate = useNavigate()

  const {dispatch}  = useAuthContext()
  const {dispatch:subjectDispatch} = useSubjectContext()

  const logout = () => {

    //remove token from the browser
    localStorage.removeItem('user')
    //update the GLOAL state
    dispatch({type:'LOGOUT'})

    // setting null when logout
    //subjectDispatch({type:'GET_ALL_SUBJECTS',payload:null})
    
    // navigate to login
    navigate("/login")
  }
  
  return {logout}
}