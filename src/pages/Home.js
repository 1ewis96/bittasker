import React, { useState, useEffect } from "react";
import { Container, Navbar, Card} from "react-bootstrap";
import { useAuth } from "react-oidc-context";
import HeroSection from "../pages/HeroSection"; // Import the component
import Navigation from "../pages/Navigation"; // Import the component
import Footer from "../pages/Footer"; // Import the component



const Home = () => {

const s3Bucket = process.env.REACT_APP_S3_URL;
const auth = useAuth();

const [status, setStatus] = useState('Checking...');

useEffect(() => {
  const checkConnection = async () => {
    if (!window.ethereum) {
      setStatus('MetaMask not detected');
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        setStatus(`Connected: ${accounts[0]}`);
      } else {
        setStatus('Not connected');
      }
    } catch (error) {
      setStatus('Not connected');
    }
  };

  checkConnection();
}, []);

return <div>{status}</div>;

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
