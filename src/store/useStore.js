import React, { createContext, useReducer, useContext } from 'react'
import * as actions from './actions.js'

/* Define a context and a reducer for updating the context */
const StoreContext = createContext()

const initialState = {
  sourceHTML: '',
  isSimulation: false,
  subjects: [],
  isEditing: false,
  selectedSubjectKeys: []
}

const StoreReducer = (state, action) => {
  switch (action.type) {
    case actions.SET_SOURCE_HTML:
      return {
        ...state,
        sourceHTML: action.payload
      }
    case actions.SET_IS_SIMULATION:
      return {
        ...state,
        isSimulation: action.payload
      }
    case actions.SET_SUBJECTS:
      return {
        ...state,
        subjects: action.payload
      }
    case actions.SET_IS_EDITING:
      return {
        ...state,
        isEditing: action.payload
      }
    case actions.SET_SELECTED_SUBJECT_KEYS:
      return {
        ...state,
        selectedSubjectKeys: action.payload
      }
    default:
      return state
  }
}

/* Export a component to provide the context to its children. This is used in our _app.js file */

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(StoreReducer, initialState)

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  )
}

/* 
Default export is a hook that provides a simple API for updating the global state. 
This also allows us to keep all of this state logic in this one file
*/

const useStore = () => {
  const [state, dispatch] = useContext(StoreContext)

  return {
    state,
    dispatch: (type, payload) => dispatch({ type, payload })
  }
}

export default useStore
