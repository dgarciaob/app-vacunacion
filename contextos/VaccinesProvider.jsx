import React, { createContext, useState, useContext } from "react";

const UserVaccinesContext = createContext();

export const useUserVaccines = () => useContext(UserVaccinesContext);

export const UserVaccinesProvider = ({ children }) => {
  const [vaccinesStatus, setVaccinesStatus] = useState({});

  return (
    <UserVaccinesContext.Provider value={{ vaccinesStatus, setVaccinesStatus }}>
      {children}
    </UserVaccinesContext.Provider>
  );
};
