import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { ethers } from "ethers";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { useUser } from "../context/UserContext";

const Wallet = () => {
  const [ethAddress, setEthAddress] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { refreshUserData, userData } = useUser();

  const s3Bucket = process.env.REACT_APP_S3_URL;
  const authToken = localStorage.getItem("auth_token");

  useEffect(() => {
    if (userData && userData.ethAddress) {
      setEthAddress(userData.ethAddress);
    }
  }, [userData]);

  const connectMetaMask = async () => {
    setError(null);
    setIsLoading(true);

    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);

        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        const response = await fetch("https://api.bittasker.xyz/cognito/auth/metamask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ ethAddress: address }),
        });

        if (!response.ok) throw new Error("Failed to get nonce from server");

        const { nonce } = await response.json();
        const signature = await signer.signMessage(nonce);

        const verifyResponse = await fetch("https://api.bittasker.xyz/cognito/auth/metamask/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ ethAddress: address, signature }),
        });

        if (!verifyResponse.ok) throw new Error("Verification failed");

        await refreshUserData();
        setEthAddress(address);
      } else {
        setError("MetaMask not found. Please install MetaMask.");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error connecting to MetaMask:", err);
    } finally {
      setIsLoading(false);
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

                {!ethAddress ? (
                  <Button
                    variant="dark"
                    style={{ backgroundColor: "#000" }}
                    onClick={connectMetaMask}
                    disabled={isLoading}
                  >
                    {isLoading ? "Connecting..." : "Connect to MetaMask"}
                    <img
                      src={`${s3Bucket}/static/metamask-logo.png`}
                      height="20px"
                      style={{ marginLeft: "5px" }}
                      alt="MetaMask logo"
                    />
                  </Button>
                ) : (
                  <div>
                    <p>Connected Address: {ethAddress}</p>
                    <Button variant="danger" disabled>
                      Unlink
                    </Button>
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
