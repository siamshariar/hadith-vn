import { useState, useEffect, createContext } from "react";

export const LayoutContext = createContext({});

const LayoutContextProvider = ({ children }) => {
  const [contentTitle, setContentTitle] = useState("");

  // useEffect(() => {
  //   const newContentTitle = "";
  //   setContentTitle(newContentTitle);
  // }, []);

  const changeContentTitle = (title) => {
    setContentTitle(title);
  };

  return (
    <LayoutContext.Provider
      value={{
        contentTitle,
        changeContentTitle,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContextProvider;
