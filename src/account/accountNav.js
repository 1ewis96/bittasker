import React from "react";
import { Container, Navbar, Nav, Dropdown } from "react-bootstrap";
import logo from "/logo.png"; // Import your logo (ensure it's in the src folder or adjust the path)
import profilePic from "./profile.jpg"; // Import your profile picture

const links = [
  { title: "Map", link: "https://bittasker.xyz/map" },
  { title: "Github", link: "https://github.com/" },
  { title: "Docs", link: "https://cdn.bittasker.xyz" },
  { title: "Wallet", link: "https://wallet.bittasker.xyz" },
  { title: "Swap", link: "https://swap.bittasker.xyz" }
];

const AccountNav = () => {
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
                <Dropdown.Item href="#"> <pre>Hello:</pre></Dropdown.Item>
				<Dropdown.Item href="#"><pre>ID Token:</pre></Dropdown.Item>
				<Dropdown.Item href="#"><pre>Access Token:</pre></Dropdown.Item>
				<Dropdown.Item href="#"><pre>Refresh Token:</pre></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navi;
