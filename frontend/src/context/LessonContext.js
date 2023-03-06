import {createContext, useReducer} from "react"

export const LessonConext = createContext()

export const lessonReducer = (state,action) => {
  switch(action.type){
    case 'GET_ALL_LESSONS':
      return{
        lessons:action.payload
      }
    case 'CREATE_LESSON':
      return{
        lessons:[action.payload, ...state.lessons]
      }  
    case 'UPDATE_LESSON':
      const updateLesson = state.lessons.map(lesson => 
        lesson._id === action.payload._id ? action.payload : lesson
      )
      return{
        lessons:updateLesson
      }
    case 'DELETE_LESSON':
      return {
        lessons:state.lessons.filter((lesson)=>lesson._id !== action.payload._id)
      }  
    default:
      return state 
  }
}

export const LessonContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(lessonReducer,{
    lessons:null
  })

  return(
    <LessonConext.Provider value={{...state, dispatch}}>
      {children}
    </LessonConext.Provider>
  )
}