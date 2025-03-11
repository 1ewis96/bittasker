import React, { useState } from "react";
import { Container, Navbar, Card} from "react-bootstrap";
import { useAuth } from "react-oidc-context";
import HeroSection from "../pages/HeroSection"; // Import the component
import Navigation from "../pages/Navigation"; // Import the component
import Footer from "../pages/Footer"; // Import the component

const Home = () => {

const auth = useAuth();
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
      <Navigation /> {/* Use the component here */}
	  
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
      <Navigation /> {/* Use the component here */}
	  
	 <div>
      <HeroSection /> {/* Use the component here */}
    </div>

<Container className="mt-4">
      <Footer /> {/* Use the component here */}
</Container>


    </>
  );
};

export default Home;
