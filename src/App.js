import React, { useState } from "react";
import axios from 'axios';

import { Container, Navbar, Card} from "react-bootstrap";
import { useAuth } from "react-oidc-context";
import HeroSection from "./HeroSection"; // Import the component
import PublicNav from "./public/publicNav"; // Import the component
import AccountNav from "./account/accountNav"; // Import the component
import Footer from "./Footer"; // Import the component


function App() {
  const auth = useAuth();
  const [responseMessage, setResponseMessage] = useState("");

// Function to send id_token to your API Gateway
const ValidateCognito = async () => {
  try {
    if (!auth.isAuthenticated) {
      setResponseMessage("User not authenticated");
      return;
    }

    const idToken = auth.user?.id_token;
	
    if (!idToken) {
      setResponseMessage("ID Token not found");
      return;
    }

	const apiEndpoint = "https://api.bittasker.xyz/cognito/auth";

	const response = await axios.post(apiEndpoint, 
	  { id_token: idToken },  // ✅ Don't stringify manually
	  {
		headers: {
		  'Content-Type': 'application/json',
		  'Accept': 'application/json',  // Ensures response is JSON
		  'Origin': window.location.origin,  // Helps with CORS validation
		},
	  }
	);

    // Assuming sessionKey is returned in response.data.sessionKey
    const sessionKey = response.data.sessionKey;

    // Store the sessionKey in sessionStorage
    if (sessionKey) {
      sessionStorage.setItem("sessionKey", sessionKey);
      setResponseMessage("Session Key saved successfully!");
    } else {
      setResponseMessage("Session Key not found in response.");
    }

    setResponseMessage(response.data.message);
  } catch (error) {
    console.error("Error calling API:", error);
    setResponseMessage(error.response?.data?.message || "Request failed");
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
	    <>
      <AccountNav /> {/* Use the component here */}
	  
	 <div>
      <HeroSection /> {/* Use the component here */}
    </div>

<Container className="mt-4">
      <Footer /> {/* Use the component here */}
</Container>

	     <div>
	  
	  <button onClick={ValidateCognito}>Authenticate User</button>

		<div>{responseMessage}</div>


        <pre>Hello: {auth.user?.profile.email}</pre>
        <pre>ID Token: {auth.user?.id_token}</pre>
        <pre>Access Token: {auth.user?.access_token}</pre>
        <pre>Refresh Token: {auth.user?.refresh_token}</pre>


      </div>

   
    </>
    );
  }

  // If not authenticated, show the main page with posts
  return (
    <>
      <PublicNav /> {/* Use the component here */}
	  
	 <div>
      <HeroSection /> {/* Use the component here */}
    </div>

<Container className="mt-4">
      <Footer /> {/* Use the component here */}
</Container>


    </>
  );
}

export default App;
