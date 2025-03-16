import React, { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';


const CognitoCallback = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const authenticateUser = async () => {
      if (auth.isAuthenticated && auth.user?.id_token) {
        try {
          const { id_token, access_token, refresh_token } = auth.user;
          const decodedIdToken = jwtDecode(id_token); // Using jwt-decode to decode the token
          const expiresAt = decodedIdToken.exp * 1000; // Convert to milliseconds

          // Store the tokens and expiry time
          localStorage.setItem("id_token", id_token);
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);
          localStorage.setItem("expires_at", expiresAt.toString());

          // Call the API to verify the id_token
          const response = await axios.post(
            "https://api.bittasker.xyz/cognito/auth",
            { id_token },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          // Handle API response
          if (response.status === 200) {
            const data = response.data;
            if (data.message === "User verified") {
              navigate("/"); // Redirect user to home page on success
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
          setLoading(false);
        }
      } else {
        setErrorMessage("Authentication failed or missing ID token.");
        setLoading(false);
      }
    };

    // Only trigger authentication when auth is loaded and authenticated
    if (!auth.isLoading && auth.isAuthenticated) {
      authenticateUser();
    }
  }, [auth.isAuthenticated, auth.user?.id_token, auth.isLoading, navigate]);

  if (auth.error) {
    return <div>Error: {auth.error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  return <div>Creating session...</div>;
};

export default CognitoCallback;
