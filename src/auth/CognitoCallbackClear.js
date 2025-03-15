import React, { useEffect } from "react";
import { useAuth } from "react-oidc-context";

// Custom hook to wrap your secure function with an authentication check
const CognitoCallbackClear = () => {
  const auth = useAuth(); // Get the auth context
	
  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Error: {auth.error.message}</div>;
  }
	
	
  // Simply return "Hello World" for now
  return <div>Clear Session</div>;
};

export default CognitoCallbackClear;
