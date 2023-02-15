import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ActionsStateContext = React.createContext();
const ActionsDispatchContext = React.createContext();

function actionsReducer(state, action) {
  switch (action.type) {
    case 'add-actions': {
      return {Actions: action.state.Actions, Buckets: action.state.Buckets};
    }
    case 'increase-count': {
      const idx = state.Actions.findIndex((el) => el.Id === action.state);
      const result = state;
      result.Actions[idx].Count += 1;
      return {...result};
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function ActionsProvider({children}) {
  const [state, dispatch] = React.useReducer(actionsReducer, {
    Actions: [],
    Buckets: [],
  });

  React.useEffect(() => {
    async function getPersistedState() {
      try {
        const value = await AsyncStorage.getItem('ACTIONS_STATE');
        if (value) {
          dispatch({
            type: 'add-actions',
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
        await AsyncStorage.setItem('ACTIONS_STATE', JSON.stringify(state));
      } catch (e) {
        console.error(e);
      }
    }
    setPersistedState();
  }, [state]);

  return (
    <ActionsStateContext.Provider value={state}>
      <ActionsDispatchContext.Provider value={dispatch}>
        {children}
      </ActionsDispatchContext.Provider>
    </ActionsStateContext.Provider>
  );
}

function useActionsState() {
  const context = React.useContext(ActionsStateContext);
  if (context === undefined) {
    throw new Error('useActionsState must be used within a ActionsProvider');
  }
  return context;
}

function useActionsDispatch() {
  const context = React.useContext(ActionsDispatchContext);
  if (context === undefined) {
    throw new Error('useActionsDispatch must be used within a ActionsProvider');
  }
  return context;
}

export {ActionsProvider, useActionsState, useActionsDispatch};
