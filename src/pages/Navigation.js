import React from "react";
import { Container, Navbar, Nav, Dropdown } from "react-bootstrap";
import logo from "../assets/logo.png"; // Ensure correct path
import profilePic from "../assets/profile.jpg"; // Ensure correct path
import { useAuth } from "react-oidc-context";
import { FaSignInAlt, FaUserPlus, FaLock } from "react-icons/fa";

const Navigation = () => {
  const auth = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">
          <img
            src={logo}
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
          />
          BitTasker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">{/* You can add links here if needed */}</Nav>

          {/* Authenticated State */}
          {auth.isAuthenticated ? (
            <Nav>
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="dark"
                  id="profile-dropdown"
                  className="d-flex align-items-center"
                >
                  <img
                    src={profilePic}
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
                  <Dropdown.Item disabled>
                    <pre style={{ width: "200px", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Hello: {auth.user?.profile.email}
                    </pre>
                  </Dropdown.Item>
                  <Dropdown.Item disabled>
                    <pre style={{ width: "200px", overflow: "hidden", textOverflow: "ellipsis" }}>
                      ID Token: {auth.user?.id_token}
                    </pre>
                  </Dropdown.Item>
                  <Dropdown.Item disabled>
                    <pre style={{ width: "200px", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Access Token: {auth.user?.access_token}
                    </pre>
                  </Dropdown.Item>
                  <Dropdown.Item disabled>
                    <pre style={{ width: "200px", overflow: "hidden", textOverflow: "ellipsis" }}>
                      Refresh Token: {auth.user?.refresh_token}
                    </pre>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => (window.location.href = "/settings")}>
                    Settings
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => auth.removeUser()}>Sign Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          ) : (
            // Unauthenticated State
            <Nav>
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="dark"
                  id="profile-dropdown"
                  className="d-flex align-items-center"
                >
                  <img
                    src={profilePic}
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
                  <Dropdown.Item onClick={() => auth.signinRedirect()}>
                    <FaSignInAlt className="mr-2" /> Sign In
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      (window.location.href =
                        "https://auth.bittasker.xyz/signup?client_id=1us07g33qbs5l00sdr1grcg2aj&redirect_uri=https%3A%2F%2Fbittasker.xyz&response_type=code&scope=email+openid+phone&state=2004b957995146ffad1a8cacd00f25db&code_challenge=ymiOw4w2n8yyiZAbl9HykC_mDSJuOcL81g9K9R4fuRU&code_challenge_method=S256")
                    }
                  >
                    <FaUserPlus className="mr-2" /> Sign Up
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      (window.location.href =
                        "https://auth.bittasker.xyz/forgotPassword?client_id=1us07g33qbs5l00sdr1grcg2aj&redirect_uri=https%3A%2F%2Fbittasker.xyz&response_type=code&scope=email+openid+phone&state=2004b957995146ffad1a8cacd00f25db&code_challenge=ymiOw4w2n8yyiZAbl9HykC_mDSJuOcL81g9K9R4fuRU&code_challenge_method=S256")
                    }
                  >
                    <FaLock className="mr-2" /> Forgot Password
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
