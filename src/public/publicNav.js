import React from "react";
import { Container, Navbar, Nav, Dropdown } from "react-bootstrap";
import logo from "../logo.png"; // Import your logo (ensure it's in the src folder or adjust the path)
import profilePic from "../profile.jpg"; // Import your profile picture
import { useAuth } from "react-oidc-context";
import { FaSignInAlt, FaUserPlus, FaLock } from 'react-icons/fa'; 

const PublicNav = () => {
	
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
          <Nav className="me-auto"> {/* This keeps other links to the left */}
            {/* You can add links here if needed */}
          </Nav>
          <Nav>
            {/* Add the dropdown with the profile photo */}
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="dark"
                id="profile-dropdown"
                className="d-flex align-items-center"
              >
                <img
                  src={profilePic} // Profile image
                  alt="Profile"
                  width="40"
                  height="40"
                  style={{
                    borderRadius: "50%", // Round shape
                    marginRight: "10px",
                    objectFit: "cover",
                    border: "3px solid #fff", // Warning border color (yellow)
                  }}
                />
              </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => auth.signinRedirect()}>
          <FaSignInAlt className="mr-2" /> Sign In
        </Dropdown.Item>
        <Dropdown.Item onClick={() => window.location.href = 'https://auth.bittasker.xyz/signup?client_id=1us07g33qbs5l00sdr1grcg2aj&redirect_uri=https%3A%2F%2Fbittasker.xyz&response_type=code&scope=email+openid+phone&state=2004b957995146ffad1a8cacd00f25db&code_challenge=ymiOw4w2n8yyiZAbl9HykC_mDSJuOcL81g9K9R4fuRU&code_challenge_method=S256'}>
          <FaUserPlus className="mr-2" /> Sign Up
        </Dropdown.Item>
        <Dropdown.Item onClick={() => window.location.href = 'https://auth.bittasker.xyz/forgotPassword?client_id=1us07g33qbs5l00sdr1grcg2aj&redirect_uri=https%3A%2F%2Fbittasker.xyz&response_type=code&scope=email+openid+phone&state=2004b957995146ffad1a8cacd00f25db&code_challenge=ymiOw4w2n8yyiZAbl9HykC_mDSJuOcL81g9K9R4fuRU&code_challenge_method=S256'}>
          <FaLock className="mr-2" /> Forgot Password
        </Dropdown.Item>
      </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PublicNav;
