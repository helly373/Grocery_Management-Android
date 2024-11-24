import React, { createContext, useState } from "react";

export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);

  const addActivity = (actionType, details) => {
    const newActivity = {
      id: Date.now().toString(),
      actionType, // e.g., "Added", "Removed", "Quantity Reduced", "Expiry Changed"
      details, // e.g., product name or specific changes
      timestamp: new Date(), // store the date and time of the activity
    };

    setActivities((prevActivities) => [newActivity, ...prevActivities]); // Add to top
  };

  return (
    <ActivityContext.Provider value={{ activities, addActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};
