import React, { createContext, useState, useContext } from "react";

// Create the context
const SelectedAppointmentContext = createContext();

// Provider component
export const SelectedAppointmentProvider = ({ children }) => {
  const [selectedAppointment, setSelectedAppointment] = useState({});

  return (
    <SelectedAppointmentContext.Provider
      value={{ selectedAppointment, setSelectedAppointment }}
    >
      {children}
    </SelectedAppointmentContext.Provider>
  );
};

// Hook to use the context
export const useSelectedAppointment = () => {
  const context = useContext(SelectedAppointmentContext);
  if (context === undefined) {
    throw new Error(
      "useSelectedAppointment must be used within a SelectedAppointmentProvider"
    );
  }
  return context;
};
