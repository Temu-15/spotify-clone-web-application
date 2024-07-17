import { createContext, useContext, useReducer } from "react";
// import { reducer ,initialState }from "./reducer";
export const stateContext = createContext();
const StateProvider = ({ initialState, reducer, children }) => {
  return (
    <stateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </stateContext.Provider>
  );
};

export const useStateProvider = () => useContext(stateContext);

export default StateProvider;
