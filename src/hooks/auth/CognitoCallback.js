import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const cognitoDomain = process.env.REACT_APP_COGNITO_URL;
const clientId = process.env.REACT_APP_COGNITO_CLIENT_ID;
const redirectUri = process.env.REACT_APP_SIGNUP_RETURN_URL;

const CognitoCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log("Component Mounted: CognitoCallback");

    const exchangeCodeForToken = async (code) => {
      console.log("Authorization Code Received:", code);

      if (!cognitoDomain || !clientId || !redirectUri) {
        console.error("Missing environment variables!");
        setErrorMessage("Configuration error: Missing Cognito settings.");
        setLoading(false);
        return;
      }

      const tokenEndpoint = `https://${cognitoDomain}/oauth2/token`;
      const params = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: clientId,
        code: code,
        redirect_uri: redirectUri,
      });

      try {
        const response = await axios.post(tokenEndpoint, params, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });

        console.log("Token Response:", response.data);

        const { id_token, access_token, refresh_token } = response.data;
        if (!id_token) throw new Error("No ID token received from Cognito.");

        const decodedIdToken = jwtDecode(id_token);
        console.log("Decoded ID Token:", decodedIdToken);

        if (!decodedIdToken.exp) {
          throw new Error("Invalid ID Token (no expiration time).");
        }

        const expiresAt = decodedIdToken.exp * 1000;
        localStorage.setItem("id_token", id_token);
        localStorage.setItem("access_token", access_token || "");
        localStorage.setItem("refresh_token", refresh_token || "");
        localStorage.setItem("expires_at", expiresAt.toString());

        // Verify user with API
        console.log("Verifying user with API...");
        const verifyResponse = await axios.post(
          "https://api.bittasker.xyz/cognito/auth",
          { id_token },
          { headers: { "Content-Type": "application/json" } }
        );

        console.log("API Verification Response:", verifyResponse.data);

        if (verifyResponse.status === 200 && verifyResponse.data?.message === "User verified") {
          console.log("User verified! Redirecting...");
          navigate("/");
        } else {
          throw new Error("Unexpected response from authentication API.");
        }
      } catch (error) {
        console.error("Authentication Error:", error);
        setErrorMessage(error.response?.data?.message || error.message || "Authentication failed.");
      } finally {
        setLoading(false);
      }
    };

    const urlParams = new URLSearchParams(location.search);
    const authCode = urlParams.get("code");

    if (authCode) {
      console.log("Authorization Code Found:", authCode);
      exchangeCodeForToken(authCode);
    } else {
      console.error("No authorization code found in URL.");
      setErrorMessage("Authentication failed: No authorization code provided.");
      setLoading(false);
    }
  }, [location, navigate]);

  // UI Feedback
  if (loading) return <div>Loading authentication...</div>;
  if (errorMessage) return <div>Error: {errorMessage}</div>;
  return <div>Creating session...</div>;
};

export default CognitoCallback;
