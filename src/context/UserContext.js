// src/context/UserContext.js

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from 'react-oidc-context'; // Using react-oidc-context for auth

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);  // Added loading state
  const [error, setError] = useState(null);  // Added error state

  const fetchUserProfile = useCallback(async () => {
    if (isAuthenticated && user) {
      setLoading(true);
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
          throw new Error(`Error fetching user data: ${response.status}`);
        }
      } catch (error) {
        setError(error.message);  // Store error message
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);  // Set loading to false after the request completes
      }
    } else {
      setLoading(false);  // Set loading to false if not authenticated
    }
  }, [isAuthenticated, user]);

  // Call fetchUserProfile on mount or when authentication status or user changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchUserProfile();
    } else {
      setLoading(false);  // Stop loading if user is not authenticated
    }
  }, [isAuthenticated, user, fetchUserProfile]);

  // Refresh the user data when called
  const refreshUserData = () => {
    fetchUserProfile();
  };

  return (
    <UserContext.Provider value={{ userData, isAuthenticated, loading, error, refreshUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
