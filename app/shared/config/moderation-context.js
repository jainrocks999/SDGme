import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModerationStateContext = React.createContext();
const ModerationDispatchContext = React.createContext();

function moderationReducer(state, action) {
  switch (action.type) {
    case 'set-moderation-count': {
      return {moderationCount: action.state};
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function ModerationProvider({children}) {
  const [state, dispatch] = React.useReducer(moderationReducer, {
    moderationCount: null,
  });

  React.useEffect(() => {
    async function getPersistedState() {
      try {
        const value = await AsyncStorage.getItem('MODERATION_STATE');
        if (value) {
          dispatch({
            type: 'set-moderation-count',
            state: JSON.parse(value).moderationCount,
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
        await AsyncStorage.setItem('MODERATION_STATE', JSON.stringify(state));
      } catch (e) {
        console.error(e);
      }
    }
    setPersistedState();
  }, [state]);

  return (
    <ModerationStateContext.Provider value={state}>
      <ModerationDispatchContext.Provider value={dispatch}>
        {children}
      </ModerationDispatchContext.Provider>
    </ModerationStateContext.Provider>
  );
}

function useModerationState() {
  const context = React.useContext(ModerationStateContext);
  if (context === undefined) {
    throw new Error(
      'useModerationState must be used within a ModerationProvider',
    );
  }
  return context;
}

function useModerationDispatch() {
  const context = React.useContext(ModerationDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useModerationDispatch must be used within a ModerationProvider',
    );
  }
  return context;
}

export {ModerationProvider, useModerationState, useModerationDispatch};
