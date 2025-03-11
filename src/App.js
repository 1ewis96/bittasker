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

  // Loading state while authentication is in progress.
  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  // Error state if there was an error during authentication.
  if (auth.error) {
    return <div>Error: {auth.error.message}</div>;
  }

  // Authenticated state.
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

  
    </>
    );
  }

  // Uunauthenticated state.
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
