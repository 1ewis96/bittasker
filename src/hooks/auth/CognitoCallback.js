import React, { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const CognitoCallback = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log("Component Mounted: CognitoCallback");

    const authenticateUser = async () => {
      console.log("=== Authenticating User ===");
      console.log("Auth Object:", auth);
      console.log("Auth Loading:", auth.isLoading);
      console.log("Auth Authenticated:", auth.isAuthenticated);
      console.log("Auth User:", auth.user);

      if (!auth.isAuthenticated || !auth.user) {
        console.warn("Auth is not authenticated or user object is missing.");
        setErrorMessage("Authentication failed or user data missing.");
        setLoading(false);
        return;
      }

      try {
        const { id_token, access_token, refresh_token } = auth.user;

        if (!id_token) {
          console.error("ID Token is missing!");
          setErrorMessage("ID Token is missing from authentication response.");
          setLoading(false);
          return;
        }

        console.log("ID Token Found:", id_token);

        const decodedIdToken = jwtDecode(id_token);
        console.log("Decoded ID Token:", decodedIdToken);

        if (!decodedIdToken.exp) {
          console.error("ID Token does not contain an expiry.");
          setErrorMessage("Invalid ID Token received.");
          setLoading(false);
          return;
        }

        const expiresAt = decodedIdToken.exp * 1000;
        console.log("Token Expiration Time:", new Date(expiresAt));

        // Store tokens in local storage
        localStorage.setItem("id_token", id_token);
        localStorage.setItem("access_token", access_token || "");
        localStorage.setItem("refresh_token", refresh_token || "");
        localStorage.setItem("expires_at", expiresAt.toString());

        // API call to verify user
        console.log("Calling API to verify user...");
        const response = await axios.post(
          "https://api.bittasker.xyz/cognito/auth",
          { id_token },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("API Response:", response);

        if (response.status === 200 && response.data?.message === "User verified") {
          console.log("User verified, redirecting to home...");
          navigate("/");
        } else {
          console.error("Unexpected API response:", response.data);
          setErrorMessage("Unexpected response from authentication API.");
        }
      } catch (error) {
        console.error("Error during authentication process:", error);
        setErrorMessage(error.response?.data?.message || "Authentication failed.");
      } finally {
        setLoading(false);
      }
    };

    // Ensure auth is fully loaded before attempting authentication
    if (!auth.isLoading) {
      authenticateUser();
    } else {
      console.log("Auth is still loading...");
    }
  }, [auth.isAuthenticated, auth.user, auth.isLoading, navigate]);

  // Additional Debugging Logs
  useEffect(() => {
    console.log("Auth State Updated:", auth);
  }, [auth]);

  useEffect(() => {
    console.log("Error Message Updated:", errorMessage);
  }, [errorMessage]);

  // UI Feedback
  if (auth.isLoading || loading) {
    return <div>Loading authentication...</div>;
  }

  if (auth.error) {
    return <div>Error: {auth.error.message}</div>;
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  return <div>Creating session...</div>;
};

export default CognitoCallback;
