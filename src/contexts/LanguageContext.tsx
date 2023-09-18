import React, { useReducer } from "react";

import { LanguageReducer } from "./LanguageReducer";

export const LanguageContext = React.createContext(null);

const storage =
  typeof window !== "undefined" && window.localStorage.getItem("lg")
    ? JSON.parse(window.localStorage.getItem("lg"))
    : {};

const initialState = {
  language: storage,
};

const LanguageContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LanguageReducer, initialState);

  const changeLanguage = payload => {
    dispatch({ type: "CHANGE_LANGUAGE", payload });
  };

  const contextValues = {
    changeLanguage,
    ...state,
  };

  return (
    <LanguageContext.Provider value={contextValues}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContextProvider;
