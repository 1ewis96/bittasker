import React, { useState } from "react";

import { Container, Navbar, Card} from "react-bootstrap";
import { useAuth } from "react-oidc-context";
import HeroSection from "./HeroSection"; // Import the component
import Navi from "./Navbar"; // Import the component
import Footer from "./Footer"; // Import the component


function App() {
  const auth = useAuth();
  const [responseMessage, setResponseMessage] = useState("");

  // This function redirects the user to the Cognito logout endpoint
  const signOutRedirect = () => {
    const clientId = "1us07g33qbs5l00sdr1grcg2aj"; // Your App Client ID
    const logoutUri = "https://bittasker.xyz"; // Redirect after logout (root domain)
    const cognitoDomain = "https://auth.bittasker.xyz";
    
    // Redirect user to Cognito logout
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

// Function to send id_token to your API Gateway
const ValidateCognito = async () => {
  try {
    // Make sure user is authenticated
    if (!auth.isAuthenticated) {
      setResponseMessage("User not authenticated");
      return;
    }

    const idToken = auth.user?.id_token;
    if (!idToken) {
      setResponseMessage("ID Token not found");
      return;
    }

    const apiEndpoint = "https://api.bittasker.xyz/cognito/auth"; // Replace with your API Gateway URL

    // Call the Lambda function through API Gateway
    const response = await axios.post(apiEndpoint, {
      id_token: idToken, // Pass the id_token to the API
    });

    setResponseMessage(response.data.message); // Set the response message from Lambda
  } catch (error) {
    console.error("Error calling API:", error);
    setResponseMessage("Error: " + error.message);
  }
};

// Example posts (you can customize this part based on your app's content)
const posts = [
{ title: "Github", link: "https://github.com/" },
	{title: "Docs", link: "https://cdn.bittasker.xyz" },
		{title: "Wallet", link: "https://wallet.bittasker.xyz"}
		]; 

  // Loading state while authentication is in progress
  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  // Error state if there was an error during authentication
  if (auth.error) {
    return <div>Error: {auth.error.message}</div>;
  }

  // Authenticated state - show user profile information and tokens
  if (auth.isAuthenticated) {
    return (
      <div>
	  
	  <button onClick={callApi}>Authenticate User</button>

		<div>{responseMessage}</div>


        <pre>Hello: {auth.user?.profile.email}</pre>
        <pre>ID Token: {auth.user?.id_token}</pre>
        <pre>Access Token: {auth.user?.access_token}</pre>
        <pre>Refresh Token: {auth.user?.refresh_token}</pre>

        {/* Button to sign out */}
        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  // If not authenticated, show the main page with posts
  return (
    <>
      <Navi /> {/* Use the component here */}
	  
	 <div>
      <HeroSection /> {/* Use the component here */}
    </div>

<Container className="mt-4">
      <Footer /> {/* Use the component here */}
</Container>



      <div>
        {/* Buttons for Sign In and Sign Out */}
        <button onClick={() => auth.signinRedirect()}>Sign in</button>
        <button onClick={signOutRedirect}>Sign out</button>
      </div>
    </>
  );
}

export default App;
