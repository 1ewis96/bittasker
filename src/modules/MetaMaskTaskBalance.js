import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { BrowserProvider, Contract } from "ethers";  // Use BrowserProvider instead of Web3Provider
import { formatUnits } from "ethers";  // Import formatUnits to format the token balance

const s3Bucket = "https://s3.bittasker.xyz"; // Replace with your actual bucket URL

const TASK_TOKEN_ADDRESS = "0x50b77f12B3a133daCBE0cdd5EdD9a6Eb35Fd8350";  // TASK token contract address
const ERC20_ABI = [
  // Minimal ABI to get balanceOf
  "function balanceOf(address owner) view returns (uint256)"
];

const WalletBadge = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMetaMask, setHasMetaMask] = useState(true);

  // Check if MetaMask is installed and if the wallet is connected
  const checkWalletConnection = async () => {
    if (!window.ethereum) {
      setHasMetaMask(false);
      setIsConnected(false);
      return;
    }

    setHasMetaMask(true);

    try {
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        await fetchBalance(accounts[0]);
      } else {
        setIsConnected(false);
      }
    } catch (error) {
      console.error("Error checking connection", error);
    }
  };

  // Fetch the TASK token balance for the connected wallet address
  const fetchBalance = async (address) => {
    const provider = new BrowserProvider(window.ethereum);  // Using BrowserProvider to connect to the network
    const tokenContract = new Contract(TASK_TOKEN_ADDRESS, ERC20_ABI, provider);  // Contract instance
    const tokenBalance = await tokenContract.balanceOf(address);
    const formattedBalance = formatUnits(tokenBalance, 18);  // Format the balance to 18 decimal places
    setBalance(formattedBalance);
  };

  // Connect the wallet
  const connectWallet = async () => {
    if (!window.ethereum) return;

    setIsLoading(true);
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        await fetchBalance(accounts[0]);
      }
    } catch (error) {
      console.error("Error connecting to MetaMask", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Disconnect the wallet
  const disconnectWallet = () => {
    setWalletAddress(null);
    setIsConnected(false);
    setBalance(null);
  };

  // Setup listeners for account changes
  useEffect(() => {
    checkWalletConnection();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", checkWalletConnection);
      window.ethereum.on("chainChanged", checkWalletConnection);

      return () => {
        window.ethereum.removeListener("accountsChanged", checkWalletConnection);
        window.ethereum.removeListener("chainChanged", checkWalletConnection);
      };
    }
  }, []);

  // Render the MetaMask button and wallet info text
  const renderButtonContent = () => {
    if (!hasMetaMask) {
      return (
        <Button
          variant="dark"
          style={{
            backgroundColor: "#000",
            padding: "5px 10px",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => window.open("https://metamask.io/download.html", "_blank")}
        >
          <span>Install MetaMask</span>
          <img
            src={`${s3Bucket}/static/metamask-logo.png`}
            height="15px"
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
          style={{
            backgroundColor: "#000",
            padding: "5px 10px",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
          }}
          onClick={connectWallet}
          disabled={isLoading}
        >
          {isLoading ? "Connecting..." : "Connect"}
          <img
            src={`${s3Bucket}/static/metamask-logo.png`}
            height="15px"
            style={{ marginLeft: "5px" }}
            alt="MetaMask logo"
          />
        </Button>
      );
    }

    return (
      <Button
        variant="dark"
        style={{
          backgroundColor: "#000",
          padding: "5px 10px",
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
        }}
        onClick={disconnectWallet}
      >
        Disconnect
      </Button>
    );
  };

  return (
    <>
      {isConnected && (
        <span
          style={{
            marginRight: "10px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "200px",
          }}
        >
                              <Badge
 
 bg=""

 style={{

   backgroundColor: 'rgba(255, 193, 7, 0.25)',

   color: '#fff',

   border: '1px solid #d39e00',

   borderRadius: '4px',

   padding: '3px 8px',

   fontWeight: 700,

   fontSize: '0.75rem',

   marginRight: '8px',

   userSelect: 'none',

   display: 'flex',

   alignItems: 'center',

   gap: '6px',

 }}

>
        {balance && ` ${balance} TASK`}

        </Badge>
        </span>
      )}
      {renderButtonContent()}
    </>
  );
};

export default WalletBadge;
