import { useAuth } from "react-oidc-context"; // import useAuth from oidc-context

// Custom hook to wrap your secure function with an authentication check
const useSecureFunction = (callback) => {
  const auth = useAuth(); // Get the auth context
  
  // Return a function that will check authentication before executing the callback
  return (...args) => {
    if (!auth.isAuthenticated) {
      console.warn("Unauthorized access attempt!"); // Warn the user
      return; // Do not execute the callback if not authenticated
    }
    
    return callback(...args); // Execute the secure action if authenticated
  };
};

export default useSecureFunction;
