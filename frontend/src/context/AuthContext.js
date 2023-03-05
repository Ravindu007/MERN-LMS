import {createContext, useEffect, useReducer} from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch(action.type){
    case 'LOGIN':
      return {
        user:action.payload
      }
    case 'LOGOUT':
      return{
        user:null
      }
    default:
      return state
  }
}

export const AuthContextProvider = ({children}) => {

  //initial state
  const [state, dispatch] = useReducer(authReducer,{
    user:null
  })

  useEffect(()=>{
    //check whether we have a token in local storage
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      dispatch({type:"LOGIN", payload:user})
    }
  },[])

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}