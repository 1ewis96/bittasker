import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap"; // assuming you're using react-bootstrap

const MetaMaskBanner = () => {
  const [status, setStatus] = useState("Checking MetaMask...");

  useEffect(() => {
    const checkConnection = async () => {
      if (!window.ethereum) {
        setStatus("MetaMask not detected");
        return;
      }

      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setStatus(`Connected: ${accounts[0]}`);
        } else {
          setStatus("Not connected");
        }
      } catch (error) {
        console.error(error);
        setStatus("Error checking connection");
      }
    };

    checkConnection();
  }, []);

  return (
    <Container className="mt-4">
      <div className="alert alert-dark text-center mt-3" role="alert">
        {status}
      </div>
    </Container>
  );
};

export default MetaMaskBanner;
