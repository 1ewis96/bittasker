import React, { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

const CognitoCallback = () => {
  const auth = useAuth(); // Get the auth context
  const navigate = useNavigate(); // To programmatically navigate to a different route
  const [loading, setLoading] = useState(true); // To track the loading state
  const [errorMessage, setErrorMessage] = useState(""); // To store error messages if any

  useEffect(() => {
    const authenticateUser = async () => {
      // Ensure the user is authenticated before calling the API
      if (auth.isAuthenticated) {
        try {
          // Prepare the request payload with the id_token
          const idToken = auth.idToken; // Get the id_token from the auth context

          // Call the API
          const response = await fetch("https://api.bittasker.xyz/cognito/auth", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id_token: idToken,
            }),
          });

          // Check if the API call was successful (HTTP status 200)
          if (response.ok) {
            // Parse the response body if needed
            const data = await response.json();

            // If the response contains specific success data, proceed
            if (data.message === "User verified") {
              // On success, redirect the user to the home page
              navigate("/"); // Redirect user to '/'
            } else {
              // Handle unexpected success message or data
              setErrorMessage("Unexpected response from the server.");
            }
          } else {
            // If the response was not ok (e.g., 4xx or 5xx status)
            const errorData = await response.json();
            setErrorMessage(errorData.message || "API call failed.");
          }
        } catch (error) {
          console.error("Error during API call:", error);
          setErrorMessage("An error occurred while verifying the user.");
        } finally {
          // Stop loading after the operation finishes
          setLoading(false);
        }
      }
    };

    // Trigger the authentication check and API call once the auth state is ready
    if (!auth.isLoading && !auth.error) {
      authenticateUser();
    }
  }, [auth.isAuthenticated, auth.idToken, auth.isLoading, auth.error, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Error: {auth.error.message}</div>;
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  // Show the page while processing the authentication and API call
  return <div>Creating session...</div>;
};

export default CognitoCallback;
