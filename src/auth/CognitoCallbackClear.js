import React, { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

const CognitoCallbackClear = () => {
  const auth = useAuth(); // Get the auth context
  const navigate = useNavigate(); // To redirect the user with useNavigate

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        // Destroy the session by calling removeUser
        await auth.removeUser();
        console.log("User session removed");

        // Redirect to homepage after signing out
        navigate("/"); // Use navigate instead of history.push
      } catch (error) {
        console.error("Error signing out:", error);
      }
    };

    if (!auth.isLoading && !auth.error) {
      handleSignOut();
    }
  }, [auth, navigate]); // Add navigate to dependency array

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Error: {auth.error.message}</div>;
  }

  // Render nothing since it's a redirect page after clearing the session
  return null;
};

export default CognitoCallbackClear;
