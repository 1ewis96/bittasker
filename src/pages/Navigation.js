import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  Dropdown,
  Badge,
  Button,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import {
  FaSignInAlt,
  FaUserPlus,
  FaLock,
  FaSyncAlt,
  FaWallet,
} from "react-icons/fa";
import { ethers } from "ethers";
import useAuthCheck from "../hooks/auth/TokenValidation";
import { useUser } from "../context/UserContext";
import ERC20ABI from "../abis/ERC20.json"; // <--- Make sure this path is correct
import WalletBadge from "../modules/MetaMaskTaskBalance";

const tokenAddress = "0x50b77f12B3a133daCBE0cdd5EdD9a6Eb35Fd8350";

const Navigation = () => {
  const { isAuthenticated } = useAuthCheck();
  const { userData } = useUser();

  const [balance, setBalance] = useState({ amount: "0.00", symbol: "TASK" });
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [metamaskInstalled, setMetamaskInstalled] = useState(true);
  const [walletAddress, setWalletAddress] = useState("");

  const fetchBalance = async () => {
    try {
      setLoading(true);
      if (!window.ethereum) {
        setMetamaskInstalled(false);
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      const tokenContract = new ethers.Contract(tokenAddress, ERC20ABI, provider);
      const decimals = await tokenContract.decimals();
      const rawBalance = await tokenContract.balanceOf(address);
      const symbol = await tokenContract.symbol();

      const formatted = ethers.formatUnits(rawBalance, decimals);

      setBalance({
        amount: parseFloat(formatted).toFixed(2),
        symbol: symbol || "TOKEN",
      });

      setWalletAddress(address);
      setWalletConnected(true);
    } catch (err) {
      console.error("Error fetching token balance:", err);
      setWalletConnected(false);
    } finally {
      setLoading(false);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      setMetamaskInstalled(false);
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setWalletConnected(true);
        fetchBalance();
      }
    } catch (err) {
      console.error("Wallet connection error:", err);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      setMetamaskInstalled(true);
      window.ethereum.on("accountsChanged", () => fetchBalance());
    } else {
      setMetamaskInstalled(false);
    }
  }, []);

  const s3Bucket = process.env.REACT_APP_S3_URL;
  const cognitoURL = process.env.REACT_APP_COGNITO_URL;
  const cognitoClientID = process.env.REACT_APP_COGNITO_CLIENT_ID;
  const logoutReturnURL = process.env.REACT_APP_LOGOUT_RETURN_URL;
  const signupReturnURL = process.env.REACT_APP_SIGNUP_RETURN_URL;
  const forgotPasswordReturnURL = process.env.REACT_APP_FORGOT_PASSWORD_RETURN_URL;

  return (
    <Navbar bg="dark" variant="dark" expand={true}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={`${s3Bucket}/static/logo.png`}
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
          />
          BitTasker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto"></Nav>

          {isAuthenticated ? (
            <Nav>
              <Dropdown align="end">
              <Dropdown.Toggle
  variant="dark"
  id="profile-dropdown"
  className="d-flex align-items-center"
  style={{
    padding: "5px 15px", // Adjust the padding to ensure the elements inside the button have space
    minWidth: "150px",   // Ensure the button is wide enough to hold the avatar and badge
    position: "relative", // Allows positioning context for badge inside the button
  }}
>
  {/* Avatar Image */}
  <img
    src={
      userData?.avatar?.path
        ? `${s3Bucket}/avatars/${userData.avatar.path}`
        : `${s3Bucket}/avatars/default.jpg`
    }
    alt="Profile"
    width="40"
    height="40"
    style={{
      borderRadius: "50%",
      marginRight: "10px",  // Space between avatar and badge
      objectFit: "cover",
      border: "3px solid #fff",
    }}
  />
  
  {/* Wallet Badge inside the dropdown button */}
  <div style={{ display: "flex", alignItems: "center" }}>
    <WalletBadge />
  </div>
</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item disabled>
                    <pre
                      style={{
                        width: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Hello: {userData?.username}
                    </pre>
                  </Dropdown.Item>
                  <Dropdown.Item disabled>
                    <pre
                      style={{
                        width: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Email: {userData?.email}
                    </pre>
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/vault">
                    Vault
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/settings">
                    Settings
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      const logoutUrl = `${cognitoURL}/logout?client_id=${cognitoClientID}&logout_uri=${logoutReturnURL}`;
                      window.location.href = logoutUrl;
                    }}
                  >
                    Sign Out
                  </Dropdown.Item>
                  <Dropdown.Divider />

                  <Dropdown.Item as={Link} to="/logout">Docs</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Row className="align-items-start">
                <Col xs={12} md="auto" className="mb-2">
                <Dropdown>
              <Dropdown.Toggle
                variant="dark"
                id="profile-dropdown"
                className="d-flex align-items-center"
                style={{
                  padding: "5px 15px", // Adjust the padding to ensure the elements inside the button have space
                  minWidth: "50px",   // Ensure the button is wide enough to hold the avatar and badge
                  position: "relative", // Allows positioning context for badge inside the button
                }}
              >
                <FaWallet className="ms-2" />
              </Dropdown.Toggle>
               <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/purchase">
                    Purchase
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/inventory">
                    Inventory
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/marketplace">
                    Marketplace
                  </Dropdown.Item>
                  <Dropdown.Divider />

                  <Dropdown.Item as={Link} to="/logout">Resources</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
                </Col>
                <Col xs={12} md="auto" className="mb-2">
                <Dropdown>
              <Dropdown.Toggle
                variant="dark"
                id="profile-dropdown"
                className="d-flex align-items-center"
                style={{
                  padding: "5px 15px", // Adjust the padding to ensure the elements inside the button have space
                  minWidth: "50px",   // Ensure the button is wide enough to hold the avatar and badge
                  position: "relative", // Allows positioning context for badge inside the button
                }}
              >
                <FaWallet className="ms-2" />
              </Dropdown.Toggle>
               <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/purchase">
                    Purchase
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/inventory">
                    Inventory
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/marketplace">
                    Marketplace
                  </Dropdown.Item>
                  <Dropdown.Divider />

                  <Dropdown.Item as={Link} to="/logout">Resources</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
                </Col>            
                <Col xs={12} md="auto" className="mb-2">
                <Dropdown>
              <Dropdown.Toggle
                variant="dark"
                id="profile-dropdown"
                className="d-flex align-items-center"
                style={{
                  padding: "5px 15px", // Adjust the padding to ensure the elements inside the button have space
                  minWidth: "50px",   // Ensure the button is wide enough to hold the avatar and badge
                  position: "relative", // Allows positioning context for badge inside the button
                }}
              >
                <FaWallet className="ms-2" />
              </Dropdown.Toggle>
               <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/purchase">
                    Purchase
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/inventory">
                    Inventory
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/marketplace">
                    Marketplace
                  </Dropdown.Item>
                  <Dropdown.Divider />

                  <Dropdown.Item as={Link} to="/logout">Resources</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
                </Col>
                </Row>
            
            </Nav>
          ) : (
            <Nav>
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="dark"
                  id="profile-dropdown"
                  className="d-flex align-items-center"
                >
                  <img
                    src={`${s3Bucket}/avatars/default.jpg`}
                    alt="Profile"
                    width="40"
                    height="40"
                    style={{
                      borderRadius: "50%",
                      marginRight: "10px",
                      objectFit: "cover",
                      border: "3px solid #fff",
                    }}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    className="d-flex justify-content-between align-items-center"
                    href={`${cognitoURL}/login?client_id=${cognitoClientID}&response_type=code&scope=openid&redirect_uri=${signupReturnURL}`}
                  >
                    Sign In <FaSignInAlt className="ms-2" />
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="d-flex justify-content-between align-items-center"
                    href={`${cognitoURL}/signup?client_id=${cognitoClientID}&response_type=code&scope=openid&redirect_uri=${signupReturnURL}`}
                  >
                    Sign Up <FaUserPlus className="ms-2" />
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="d-flex justify-content-between align-items-center"
                    href={`${cognitoURL}/forgotPassword?client_id=${cognitoClientID}&response_type=code&scope=openid&redirect_uri=${forgotPasswordReturnURL}`}
                  >
                    Forgot Password <FaLock className="ms-2" />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
