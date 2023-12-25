import React, { createContext, useState, useContext } from "react";

// Create the context
const CurrentDoctorContext = createContext();

// Provider component
export const CurrentDoctorProvider = ({ children }) => {
  const [currentDoctor, setCurrentDoctor] = useState(null);

  return (
    <CurrentDoctorContext.Provider value={{ currentDoctor, setCurrentDoctor }}>
      {children}
    </CurrentDoctorContext.Provider>
  );
};

// Hook to use the context
export const useCurrentDoctor = () => {
  const context = useContext(CurrentDoctorContext);
  if (context === undefined) {
    throw new Error(
      "useCurrentDoctor must be used within a CurrentDoctorProvider"
    );
  }
  return context;
};
