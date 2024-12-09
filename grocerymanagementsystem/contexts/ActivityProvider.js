import React, { createContext, useState } from "react";

export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);

  const addActivity = (actionType, details) => {
    const newActivity = {
      id: Date.now().toString(),
      actionType, 
      details, 
      timestamp: new Date(),
    };

    setActivities((prevActivities) => [newActivity, ...prevActivities]); 
  };

  return (
    <ActivityContext.Provider value={{ activities, addActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};
