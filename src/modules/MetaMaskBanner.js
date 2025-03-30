import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";

const s3Bucket = "https://s3.bittasker.xyz"; // Replace with your actual bucket URL

const MetaMaskBanner = () => {
  const [status, setStatus] = useState("Checking MetaMask...");
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetaMask, setHasMetaMask] = useState(true);

  const updateStatus = async () => {
    if (!window.ethereum) {
      setHasMetaMask(false);
      setStatus("MetaMask not detected");
      setIsConnected(false);
      return;
    }

    setHasMetaMask(true);

    try {
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        setIsConnected(true);
        setStatus(`Connected: ${accounts[0]}`);
      } else {
        setIsConnected(false);
        setStatus("Not connected");
      }
    } catch (error) {
      console.error(error);
      setStatus("Error checking connection");
    }
  };

  const connectMetaMask = async () => {
    if (!window.ethereum) return;

    setIsLoading(true);
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      if (accounts.length > 0) {
        setIsConnected(true);
        setStatus(`Connected: ${accounts[0]}`);
      }
    } catch (error) {
      console.error(error);
      setStatus("Error connecting to MetaMask");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    updateStatus();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", updateStatus);
      window.ethereum.on("chainChanged", updateStatus);

      return () => {
        window.ethereum.removeListener("accountsChanged", updateStatus);
        window.ethereum.removeListener("chainChanged", updateStatus);
      };
    }
  }, []);

  const renderButton = () => {
    if (!hasMetaMask) {
      return (
        <Button
          variant="dark"
          style={{ backgroundColor: "#000" }}
          onClick={() => window.open("https://metamask.io/download.html", "_blank")}
        >
          Install MetaMask
          <img
            src={`${s3Bucket}/static/metamask-logo.png`}
            height="20px"
            style={{ marginLeft: "5px" }}
            alt="MetaMask logo"
          />
        </Button>
      );
    }

    if (!isConnected) {
      return (
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
      );
    }

    return null; // No button if already connected
  };

  return (

      <div className="alert alert-dark mt-3" role="alert">
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-start">{status}</span>
          {renderButton()}
        </div>
      </div>

  );
};

export default MetaMaskBanner;
