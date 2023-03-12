import { createContext, useReducer } from "react";

export const SubmissionContext = createContext()

export const submissionReducer = (state,action) => {
  switch(action.type){
    case 'GET_ALL_SUBMISSIONS':
      return{
        submissions:action.payload
      }
    case 'CREATE_SUBMISSION':
      return{
        submissions:[action.payload, ...state.submissions]
      }
    case 'UPDATE_SUBMISSION':
      const updatedSubmission = state.submissions.map(submission => 
        submission._id === action.payload.id ? action.payload : submission)
      return{
        submissions:updatedSubmission
      }
    default:
      return state
  }
}

export const SubmissionContextProvider = ({children}) => {

  const [state, dispatch] = useReducer(submissionReducer,{
    submissions:null
  })

  return(
    <SubmissionContext.Provider value={{...state,dispatch}}>
      {children}
    </SubmissionContext.Provider>
  )
}