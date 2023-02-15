import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResultsStateContext = React.createContext({
  Results: [],
  loading: true,
});
const ResultsDispatchContext = React.createContext();

function ResultsReducer(state, result) {
  switch (result.type) {
    case 'add-results': {
      return {
        ...state,
        Results: result.state,
      };
    }
    case 'set-loading': {
      return {
        ...state,
        loading: result.state,
      };
    }
    default: {
      throw new Error(`Unhandled result type: ${result.type}`);
    }
  }
}

function ResultsProvider({children}) {
  const [state, dispatch] = React.useReducer(ResultsReducer, {
    Results: null,
  });

  React.useEffect(() => {
    async function getPersistedState() {
      try {
        const value = await AsyncStorage.getItem('RESULTS_STATE');
        if (value) {
          dispatch({
            type: 'add-results',
            state: JSON.parse(value),
          });
        }
      } catch (e) {
        console.error(e);
      }
    }
    getPersistedState();
  }, []);

  React.useEffect(() => {
    async function setPersistedState() {
      try {
        await AsyncStorage.setItem('RESULTS_STATE', JSON.stringify(state));
      } catch (e) {
        console.error(e);
      }
    }
    setPersistedState();
  }, [state]);

  return (
    <ResultsStateContext.Provider value={state}>
      <ResultsDispatchContext.Provider value={dispatch}>
        {children}
      </ResultsDispatchContext.Provider>
    </ResultsStateContext.Provider>
  );
}

function useResultsState() {
  const context = React.useContext(ResultsStateContext);
  if (context === undefined) {
    throw new Error('useResultsState must be used within a ResultsProvider');
  }
  return context;
}

function useResultsDispatch() {
  const context = React.useContext(ResultsDispatchContext);
  if (context === undefined) {
    throw new Error('useResultsDispatch must be used within a ResultsProvider');
  }
  return context;
}

export {ResultsProvider, useResultsState, useResultsDispatch};
