import React, { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

const CognitoCallback = () => {
  const auth = useAuth(); // Get the auth context
  const navigate = useNavigate(); // To programmatically navigate to a different route
  const [loading, setLoading] = useState(true); // To track the loading state
  const [errorMessage, setErrorMessage] = useState(""); // To store error messages if any

  useEffect(() => {
    const authenticateUser = async () => {
      // Wait for auth state to be ready and ensure id_token exists
      if (auth.isAuthenticated && auth.user?.id_token) {
        try {
          // Prepare the request payload with the id_token
          const idToken = auth.user?.id_token; // Get the id_token from the auth context

          // Call the API using Axios
          const response = await axios.post(
            "https://api.bittasker.xyz/cognito/auth",
            { id_token: idToken },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          // If the response is successful
          if (response.status === 200) {
            const data = response.data;

            // If the response contains specific success data, proceed
            if (data.message === "User verified") {
              // On success, redirect the user to the home page
              navigate("/"); // Redirect user to '/'
            } else {
              setErrorMessage("Unexpected response from the server.");
            }
          } else {
            setErrorMessage(`API call failed with status: ${response.status}`);
          }
        } catch (error) {
          console.error("Error during API call:", error);
          setErrorMessage("An error occurred while verifying the user.");
        } finally {
          setLoading(false); // Stop loading after API call completes
        }
      } else {
        setErrorMessage("Authentication failed or missing ID token.");
        setLoading(false); // Stop loading if auth is not completed
      }
    };

    // Only call authenticateUser once auth is loaded and authenticated
    if (!auth.isLoading && auth.isAuthenticated) {
      authenticateUser();
    }

  }, [auth.isAuthenticated, auth.user?.id_token, auth.isLoading, navigate]);

  // Handle error states
  if (auth.error) {
    return <div>Error: {auth.error.message}</div>;
  }

  // Show loading indicator while waiting for authentication to complete
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show error message if any
  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  // Success state (redirecting or other actions are handled in useEffect)
  return <div>Creating session...</div>;
};

export default CognitoCallback;
