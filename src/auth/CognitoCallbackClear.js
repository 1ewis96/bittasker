import React from "react";
import { useAuth } from "react-oidc-context";

// Custom hook to wrap your secure function with an authentication check
const CognitoCallbackClear = () => {
  const auth = useAuth(); // Get the auth context

  // Simply return "Hello World" for now
  return <div>Clear Session</div>;
};

export default CognitoCallbackClear;
