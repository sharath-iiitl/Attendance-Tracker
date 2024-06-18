import { createContext, useReducer } from "react";
import UserReducer from "./UserReducer";

const INITIAL_STATE = {
  user: false,
};

export const UserContext = createContext(INITIAL_STATE);

export const UserContextProvider = ({ children }) => {
  const [state, dispatchUser] = useReducer(UserReducer, INITIAL_STATE);

  return (
    <UserContext.Provider value={{ user: state.user, dispatchUser }}>
      {children}
    </UserContext.Provider>
  );
};