import { createContext, useReducer } from "react";

export const AssignmentContext = createContext()

export const assignmentReducer = (state,action) => {
  switch(action.type){
    case 'GET_ALL_ASSIGNMENTS':
      return{
        assignments:action.payload
      }
    case 'GET_SINGLE_ASSIGNMENT':
      return{
        assignments:action.payload
      }
    case 'CREATE_ASSIGNMENT':
      return{
        assignments:[action.payload, ...state.assignments]
      }  
    case 'UPDATE_ASSIGNMENT':
      let updatedAssignment = {...state.assignments};
      if (updatedAssignment._id === action.payload._id) {
        updatedAssignment = {...updatedAssignment, ...action.payload};
      }
      return {
        assignments: updatedAssignment
      }
    case 'DELETE_ASSIGNMENT':
      return {
        assignments:{}
      }  
    default:
      return state 
  }
}

export const AssignmentContextProvider = ({children}) => {

  const [state, dispatch] = useReducer(assignmentReducer,{
    assignments:null
  })
  return(
    <AssignmentContext.Provider value={{...state,dispatch}}>
      {children}
    </AssignmentContext.Provider>
  )
}