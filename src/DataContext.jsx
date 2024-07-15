import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [id, setId] = useState(null);
  const [heading, setHeading] = useState(null);
  const [theme, setTheme] = useState(false);

  return (
    <DataContext.Provider
      value={{
        open,
        setOpen,
        page,
        setPage,
        id,
        setId,
        heading,
        setHeading,
        theme,
        setTheme,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
