import React from "react";
import App from "./App";
import { MainProvider } from "./context/main.context";

export const Landing = () => {
  return (
    <MainProvider>
      <App />
    </MainProvider>
  );
};
