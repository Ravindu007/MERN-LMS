import { createContext, useReducer } from "react";

export const SubjectContext = createContext()

export const subjectReducer = (state, action) => {
  switch(action.type){
    case 'GET_ALL_SUBJECTS':
      return{
        subjects:action.payload
      }
    case 'GET_SINGLE_SUBJECT':
      return{
        subjects:action.payload
      }
    case 'CREATE_SUBJECT':
      return{
        subjects:[action.payload, ...state.subjects]
      }  
    case 'UPDATE_SUBJECT':
      const updatedSubject = state.subjects.map(subject => 
        subject._id === action.payload._id ? action.payload : subject
      )
      return{
        subjects:updatedSubject
      }
    case 'DELETE_SUBJECT':
      return{
        subjects:state.subjects.filer((subject)=>subject._id !== action.payload._id)
      } 
    default:
      return state 
  }
}

export const SubjectContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(subjectReducer,{
    subjects:null
  })

  return(
    <SubjectContext.Provider value={{...state, dispatch}}>
      {children}
    </SubjectContext.Provider>
  )
}