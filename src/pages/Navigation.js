import React from "react";
import { Container, Navbar, Nav, Dropdown } from "react-bootstrap";
import logo from "../assets/logo.png"; // Ensure correct path
import profilePic from "../assets/profile.jpg"; // Ensure correct path
import { useAuth } from "react-oidc-context";
import { FaSignInAlt, FaUserPlus, FaLock } from "react-icons/fa";

const Navigation = () => {
  const auth = useAuth();
  
  const cognitoAuthority = process.env.REACT_APP_COGNITO_AUTHORITY;
  const cognitoURL = process.env.REACT_APP_COGNITO_URL;
  const cognitoClientID = process.env.REACT_APP_COGNITO_CLIENT_ID;
  const signinReturnURL = process.env.REACT_APP_SIGNIN_RETURN_URL;
  const logoutReturnURL = process.env.REACT_APP_LOGOUT_RETURN_URL;
  const signupReturnURL = process.env.REACT_APP_SIGNUP_RETURN_URL;
  const forgotPasswordReturnURL = process.env.REACT_APP_FORGOT_PASSWORD_RETURN_URL;

  return (
    <Navbar bg="dark" variant="dark" expand={true}>
      <Container>
        <Navbar.Brand href="/">
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
                  <Dropdown.Item 
                    className="d-flex justify-content-between align-items-center" 
                    onClick={() => auth.signinRedirect()}
                  >
                    Sign In <FaSignInAlt className="ms-2" />
                  </Dropdown.Item>

                  <Dropdown.Item 
                    className="d-flex justify-content-between align-items-center" 
                    onClick={() => window.location.href = `${cognitoURL}/signup?client_id=${cognitoClientID}&response_type=code&scope=openid&redirect_uri=${signupReturnURL}`}
                  >
                    Sign Up <FaUserPlus className="ms-2" />
                  </Dropdown.Item>

                  <Dropdown.Item 
                    className="d-flex justify-content-between align-items-center" 
                    onClick={() => window.location.href = `${cognitoURL}/forgotPassword?client_id=${cognitoClientID}&response_type=code&scope=openid&redirect_uri=${forgotPasswordReturnURL}`}
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
