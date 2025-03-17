import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { ethers } from "ethers";  // Import ethers.js
import Navigation from "./Navigation";
import Footer from "./Footer";

const Wallet = () => {
  const [ethAddress, setEthAddress] = useState(null);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false); // To track if MetaMask is connected
  const [isLoading, setIsLoading] = useState(false); // To show loading state while waiting for backend calls

  const s3Bucket = process.env.REACT_APP_S3_URL;

  // Function to handle MetaMask login
const connectMetaMask = async () => {
  setError(null);
  setIsLoading(true);

  try {
    if (window.ethereum) {
      // Initialize provider using window.ethereum (MetaMask)
      const provider = new ethers.BrowserProvider(window.ethereum); // Use BrowserProvider from ethers.js v6
      await provider.send("eth_requestAccounts", []); // Request accounts (MetaMask prompts the user)
      
      const signer = await provider.getSigner(); // Use getSigner method after connecting
      const address = await signer.getAddress(); // Get the address from the signer
      
      setEthAddress(address); // Set the address in state
      setIsConnected(true); // Set the connection state

      // Call your backend API to get the nonce for the address
      const response = await fetch("https://api.bittasker.xyz/cognito/auth/metamask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ethAddress: address }),
      });

      if (!response.ok) {
        throw new Error("Failed to get nonce from the server");
      }

      const { nonce } = await response.json(); // Assume the API returns a nonce

      // Sign the nonce with MetaMask (this proves ownership)
      const signature = await signer.signMessage(nonce);

      // Send the signed message and address to your backend for verification
      const verifyResponse = await fetch("https://api.bittasker.xyz/cognito/auth/metamask/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ethAddress: address,
          signature,
        }),
      });

      if (!verifyResponse.ok) {
        throw new Error("Verification failed");
      }

      const { access_token, id_token, refresh_token, expires_in } = await verifyResponse.json(); // Handle the returned tokens

      // Store tokens in localStorage
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("id_token", id_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("expires_in", expires_in);

      console.log("Tokens stored:", { access_token, id_token, refresh_token });

      // Redirect the user to the dashboard (or any other page)
      window.location.href = "/"; // You can change "/dashboard" to any path you prefer

    } else {
      setError("MetaMask not found. Please install MetaMask.");
    }
  } catch (err) {
    setError(err.message);
    console.error("Error connecting to MetaMask:", err);
  } finally {
    setIsLoading(false); // Stop loading when done
  }
};

  return (
    <>
      <Navigation />
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="p-4 text-center bg-dark text-white">
              <Card.Body>
                <h1>Wallet Page</h1>
                <p>This is the wallet page. Integrate your wallet component here.</p>

                {/* MetaMask Connection Button */}
                {!isConnected ? (
                  <Button
                    variant="dark"
                    style={{
                      backgroundColor: "#000",
                    }}
                    onClick={connectMetaMask}
                    disabled={isLoading} // Disable button while loading
                  >
                    {isLoading ? "Connecting..." : "Connect to MetaMask"}
                    <img
                      src={`${s3Bucket}/static/metamask-logo.png`}
                      height="20px"
                      style={{
                        marginLeft: "5px",
                      }}
                      alt="MetaMask logo"
                    />
                  </Button>
                ) : (
                  <div>
                    <p>Connected Address: {ethAddress}</p>
                  </div>
                )}

                {error && <div style={{ color: "red" }}>{error}</div>}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Wallet;
