import { createContext, useReducer } from "react";

export const LmsUserContext = createContext()

export const lmsUserReducer = (state,action) => {
  switch(action.type){
    case 'SET_LMSUSERS':
      return{
        lmsUsers:action.payload
      }
    case 'CREATE_LMSUSER':
      return{
        lmsUsers:[action.payload, ...state.lmsUsers]
      }
    case 'UPDATE_LMSUSER':
      const updateLmsUsers = state.lmsUsers.map(lmsUser => 
        lmsUser._id === action.payload._id ? action.payload : lmsUser
        )
      return{
        lmsUsers:updateLmsUsers
      }
    case 'DELETE_LMSUSER':
      return{
        lmsUsers:state.lmsUsers.filter((lmsUser)=>lmsUser._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const LmsUserContextProvider = ({children}) => {

  const [state, dispatch] = useReducer(lmsUserReducer,{
    lmsUsers:null
  })
  return(
    <LmsUserContext.Provider value={{...state, dispatch}}>
      {children}
    </LmsUserContext.Provider>
  )
}