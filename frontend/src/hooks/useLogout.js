import {useAuthContext} from "./useAuthContext"

export const useLogout = () => {
  const {dispatch}  = useAuthContext()


  const logout = () => {

    //remove token from the browser
    localStorage.removeItem('user')
    //update the GLOAL state
    dispatch({type:'LOGOUT'})
  }
  
  return {logout}
}