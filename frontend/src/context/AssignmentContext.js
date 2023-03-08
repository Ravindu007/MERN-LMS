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
      const updateAssignment = state.assignments.map(assignment => 
        assignment._id === action.payload._id ? action.payload : assignment
      )
      return{
        assignments:updateAssignment
      }
    case 'DELETE_ASSIGNMENT':
      return {
        assignments:state.assignments.filter((assignment)=>assignment._id !== action.payload._id)
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