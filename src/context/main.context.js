import React, { createContext, useEffect, useState } from "react";
// Create the context object
export const MainContext = createContext(null);
//

export const MainProvider = ({ children }) => {
  const [activeElement, setactiveElement] = useState(null);
  const [Raja, setRaja] = useState("my name is yakraj ");
  const [MainUnit, onMainUnit] = useState("px");
  return (
    <MainContext.Provider
      value={{
        activeElement,
        setactiveElement,
        Raja,
        setRaja,
        MainUnit,
        onMainUnit,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
