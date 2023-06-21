import React, { createContext, useEffect, useState } from "react";
// Create the context object
export const MainContext = createContext(null);
//

export const MainProvider = ({ children }) => {
  const [activeElement, setactiveElement] = useState(null);
  const [Raja, setRaja] = useState("my name is yakraj ");
  const [MainUnit, onMainUnit] = useState("px");
  const [TggTxtControl, onTggTxtControl] = useState(false);
  const [TggPropControl, onTggPropControl] = useState(false);

  useEffect(() => {
    if (!activeElement) {
      return;
    }
    var hasText = Array.from(activeElement.childNodes).some(function (node) {
      return node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "";
    });

    if (hasText) {
      onTggTxtControl(true);
      onTggPropControl(false);
    } else {
      onTggTxtControl(false);
      onTggPropControl(true);
    }
  }, [activeElement]);

  function generateRandomNumber() {
    return Math.floor(10000 + Math.random() * 90000);
  }
  return (
    <MainContext.Provider
      value={{
        activeElement,
        setactiveElement,
        Raja,
        setRaja,
        MainUnit,
        onMainUnit,
        TggTxtControl,
        onTggTxtControl,
        TggPropControl,
        onTggPropControl,
        generateRandomNumber,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
