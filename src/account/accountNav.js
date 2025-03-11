import React from "react";
import { Container, Navbar, Nav, Dropdown } from "react-bootstrap";
import logo from "../assets/logo.png"; // Import your logo (ensure it's in the src folder or adjust the path)
import profilePic from "../assets/profile.jpg"; // Import your profile picture
import { useAuth } from "react-oidc-context";

const AccountNav = () => {
	
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
  <Dropdown.Item onClick={() => window.location.href = '/settings'}>
    Settings
  </Dropdown.Item>
  <Dropdown.Item onClick={() => auth.removeUser()}>
    Sign Out
  </Dropdown.Item>
  
  <Dropdown.Item disabled>
    <pre style={{ width: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
      Hello: {auth.user?.profile.email}
    </pre>
  </Dropdown.Item>
  <Dropdown.Item disabled>
    <pre style={{ width: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
      ID Token: {auth.user?.id_token}
    </pre>
  </Dropdown.Item>
  <Dropdown.Item disabled>
    <pre style={{ width: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
      Access Token: {auth.user?.access_token}
    </pre>
  </Dropdown.Item>
  <Dropdown.Item disabled>
    <pre style={{ width: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
      Refresh Token: {auth.user?.refresh_token}
    </pre>
  </Dropdown.Item>
</Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AccountNav;
