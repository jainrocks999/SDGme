import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserStateContext = React.createContext();
const UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case 'change-token': {
      return {MobileToken: action.state};
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({children}) {
  const [state, dispatch] = React.useReducer(userReducer, {
    MobileToken: null,
  });

  React.useEffect(() => {
    async function getPersistedState() {
      try {
        const value = await AsyncStorage.getItem('USER_STATE');
        if (value) {
          dispatch({
            type: 'change-token',
            state: JSON.parse(value).MobileToken,
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
        await AsyncStorage.setItem('USER_STATE', JSON.stringify(state));
      } catch (e) {
        console.error(e);
      }
    }
    setPersistedState();
  }, [state]);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
}

function useUserDispatch() {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }
  return context;
}

export {UserProvider, useUserState, useUserDispatch};
