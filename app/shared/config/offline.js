import * as React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const RequestsStateContext = React.createContext()
const RequestsDispatchContext = React.createContext()

function requestsReducer(state, action) {
  switch (action.type) {
    case 'add-request': {
      return {
        ...state,
        Requests: [...state.Requests, action.state],
      }
    }
    case 'remove-request': {
      return {
        ...state,
        Requests: state.Requests.filter((element) => element !== action.state),
      }
    }
    case 'persisted': {
      return {
        ...state,
        persisted: true,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function RequestsProvider({ children }) {
  const [state, dispatch] = React.useReducer(requestsReducer, {
    persisted: false,
    Requests: [],
  })

  React.useEffect(() => {
    async function getPersistedState() {
      try {
        const value = await AsyncStorage.getItem("REQUESTS_STATE")

        JSON.parse(value).Requests.map((request) => {
          dispatch({
            type: 'add-request',
            state: request,
          })
        })

        dispatch({
          type: 'persisted',
        })
      } catch (e) {
        console.error(e)
      }
    }
    getPersistedState()
  }, [])

  React.useEffect(() => {
    async function setPersistedState() {
      try {
        await AsyncStorage.setItem('REQUESTS_STATE', JSON.stringify(state))
      } catch (e) {
        console.error(e)
      }
    }
    setPersistedState()
  }, [state])

  return (
    <RequestsStateContext.Provider value={state}>
      <RequestsDispatchContext.Provider value={dispatch}>
        {children}
      </RequestsDispatchContext.Provider>
    </RequestsStateContext.Provider>
  )
}

function useRequestsState() {
  const context = React.useContext(RequestsStateContext)
  if (context === undefined) {
    throw new Error('useRequestsState must be used within a RequestsProvider')
  }
  return context
}

function useRequestsDispatch() {
  const context = React.useContext(RequestsDispatchContext)
  if (context === undefined) {
    throw new Error(
      'useRequestsDispatch must be used within a RequestsProvider'
    )
  }
  return context
}

export { RequestsProvider, useRequestsState, useRequestsDispatch }
