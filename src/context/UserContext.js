// src/context/UserContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from 'react-oidc-context'; // Using react-oidc-context for auth

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isAuthenticated && user) {
        try {
          const response = await fetch('https://api.bittasker.xyz/profile/me/', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${user.access_token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUserData(data.data); // Store the profile data (including avatar)
          } else {
            console.error('Error fetching user data:', response.status);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserProfile();
  }, [isAuthenticated, user]); // Only fetch when authenticated

  return (
    <UserContext.Provider value={{ userData, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
