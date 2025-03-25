import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav, Dropdown, Badge, Button, Spinner } from "react-bootstrap";
import { FaSignInAlt, FaUserPlus, FaLock, FaSyncAlt } from "react-icons/fa";
import useAuthCheck from "../hooks/auth/TokenValidation";
import { useUser } from "../context/UserContext";

const Navigation = () => {
  const { isAuthenticated } = useAuthCheck();
  const { userData } = useUser();

  const [balance, setBalance] = useState({ amount: "0.00", symbol: "TASK" });
  const [loading, setLoading] = useState(false);

  const fetchBalance = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    try {
      setLoading(true);
      const res = await fetch("https://api.bittasker.xyz/tx/balance", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch balance");

      const data = await res.json();
      setBalance({
        amount: parseFloat(data?.balance || 0).toFixed(2),
        symbol: data?.symbol || "TASK",
      });
    } catch (err) {
      console.error("Balance fetch error:", err);
      setBalance({ amount: "0.00", symbol: "TASK" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      // Only run once on hard refresh
      fetchBalance();
  
      // Optional: expose to window for external script calls
      window.fetchUserBalance = fetchBalance;
    }
  }, []); // empty deps = only once
  

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
                >
                  <img
                    src={userData?.avatar?.path ? `${s3Bucket}/avatars/${userData.avatar.path}` : `${s3Bucket}/avatars/default.jpg`}
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
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      <>
                        {balance.amount} {balance.symbol}
                        <FaSyncAlt
                          onClick={(e) => {
                            e.stopPropagation(); // prevent dropdown toggle
                            fetchBalance();
                          }}
                          style={{ cursor: "pointer" }}
                          title="Refresh Balance"
                        />
                      </>
                    )}
                  </Badge>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item disabled>
                    <pre style={{ width: "200px", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Hello: {userData?.username}
                    </pre>
                  </Dropdown.Item>
                  <Dropdown.Item disabled>
                    <pre style={{ width: "200px", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Email: {userData?.email}
                    </pre>
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/vault">Vault</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      const logoutUrl = `${cognitoURL}/logout?client_id=${cognitoClientID}&logout_uri=${logoutReturnURL}`;
                      window.location.href = logoutUrl;
                    }}
                  >
                    Sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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