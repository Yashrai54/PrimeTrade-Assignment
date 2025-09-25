
import React, { createContext } from "react";

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const baseUrl = "http://localhost:8000/api/v1";

  return (
    <ApiContext.Provider value={{ baseUrl }}>
      {children}
    </ApiContext.Provider>
  );
};
